package com.threadspeak.user.service;

import com.threadspeak.user.entity.UserProgressEntity;
import com.threadspeak.user.model.UserProgress;
import com.threadspeak.user.repository.UserProgressRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserProgressService {

    private final UserProgressRepository repository;
    private final Map<String, UserProgress> memoryFallback = new ConcurrentHashMap<>();

    public UserProgressService(UserProgressRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public UserProgress getProgress(String userId) {
        try {
            return repository.findById(userId)
                    .map(UserProgressEntity::toModel)
                    .orElseGet(() -> memoryFallback.computeIfAbsent(userId, id -> new UserProgress(id, new HashSet<>(), new HashSet<>(), new HashMap<>(), 0, 1)));
        } catch (Exception e) {
            return memoryFallback.computeIfAbsent(userId, id -> new UserProgress(id, new HashSet<>(), new HashSet<>(), new HashMap<>(), 0, 1));
        }
    }

    @Transactional
    public UserProgress completeTopic(String userId, String topicId) {
        UserProgress progress = getProgress(userId);
        progress.getCompletedTopicIds().add(topicId);
        progress.setTotalXp(progress.getTotalXp() + 50);
        return saveProgress(progress);
    }

    @Transactional
    public UserProgress toggleBookmark(String userId, String topicId) {
        UserProgress progress = getProgress(userId);
        if (progress.getBookmarkedTopicIds().contains(topicId)) {
            progress.getBookmarkedTopicIds().remove(topicId);
        } else {
            progress.getBookmarkedTopicIds().add(topicId);
        }
        return saveProgress(progress);
    }

    @Transactional
    public UserProgress addXp(String userId, int xp) {
        UserProgress progress = getProgress(userId);
        progress.setTotalXp(progress.getTotalXp() + xp);
        return saveProgress(progress);
    }

    @Transactional
    public UserProgress recordQuizScore(String userId, String topicOrTrackId, int score, int xp) {
        UserProgress progress = getProgress(userId);
        if (progress.getQuizScores() == null) {
            progress.setQuizScores(new HashMap<>());
        }
        progress.getQuizScores().put(topicOrTrackId, score);
        progress.setTotalXp(progress.getTotalXp() + xp);
        return saveProgress(progress);
    }

    @Transactional
    public UserProgress saveProgress(UserProgress progress) {
        memoryFallback.put(progress.getUserId(), progress);
        try {
            UserProgressEntity saved = repository.save(UserProgressEntity.fromModel(progress));
            return saved.toModel();
        } catch (Exception e) {
            return progress;
        }
    }
}
