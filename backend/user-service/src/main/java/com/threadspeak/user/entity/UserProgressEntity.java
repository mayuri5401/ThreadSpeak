package com.threadspeak.user.entity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.user.model.UserProgress;
import jakarta.persistence.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Entity
@Table(name = "user_progress")
public class UserProgressEntity {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Id
    @Column(name = "user_id", length = 100)
    private String userId;

    @Column(name = "completed_topics_json", columnDefinition = "TEXT")
    private String completedTopicsJson;

    @Column(name = "bookmarked_topics_json", columnDefinition = "TEXT")
    private String bookmarkedTopicsJson;

    @Column(name = "quiz_scores_json", columnDefinition = "TEXT")
    private String quizScoresJson;

    @Column(name = "total_xp")
    private int totalXp;

    @Column(name = "current_streak_days")
    private int currentStreakDays;

    public UserProgressEntity() {}

    public static UserProgressEntity fromModel(UserProgress progress) {
        if (progress == null) return null;
        UserProgressEntity entity = new UserProgressEntity();
        entity.setUserId(progress.getUserId());
        entity.setTotalXp(progress.getTotalXp());
        entity.setCurrentStreakDays(progress.getCurrentStreakDays());
        try {
            entity.setCompletedTopicsJson(MAPPER.writeValueAsString(progress.getCompletedTopicIds()));
            entity.setBookmarkedTopicsJson(MAPPER.writeValueAsString(progress.getBookmarkedTopicIds()));
            entity.setQuizScoresJson(MAPPER.writeValueAsString(progress.getQuizScores()));
        } catch (Exception ignored) {}
        return entity;
    }

    public UserProgress toModel() {
        UserProgress p = new UserProgress();
        p.setUserId(this.userId);
        p.setTotalXp(this.totalXp);
        p.setCurrentStreakDays(this.currentStreakDays);
        try {
            if (this.completedTopicsJson != null) {
                p.setCompletedTopicIds(MAPPER.readValue(this.completedTopicsJson, new TypeReference<Set<String>>() {}));
            } else {
                p.setCompletedTopicIds(new HashSet<>());
            }
            if (this.bookmarkedTopicsJson != null) {
                p.setBookmarkedTopicIds(MAPPER.readValue(this.bookmarkedTopicsJson, new TypeReference<Set<String>>() {}));
            } else {
                p.setBookmarkedTopicIds(new HashSet<>());
            }
            if (this.quizScoresJson != null) {
                p.setQuizScores(MAPPER.readValue(this.quizScoresJson, new TypeReference<Map<String, Integer>>() {}));
            } else {
                p.setQuizScores(new HashMap<>());
            }
        } catch (Exception e) {
            p.setCompletedTopicIds(new HashSet<>());
            p.setBookmarkedTopicIds(new HashSet<>());
            p.setQuizScores(new HashMap<>());
        }
        return p;
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCompletedTopicsJson() { return completedTopicsJson; }
    public void setCompletedTopicsJson(String completedTopicsJson) { this.completedTopicsJson = completedTopicsJson; }

    public String getBookmarkedTopicsJson() { return bookmarkedTopicsJson; }
    public void setBookmarkedTopicsJson(String bookmarkedTopicsJson) { this.bookmarkedTopicsJson = bookmarkedTopicsJson; }

    public String getQuizScoresJson() { return quizScoresJson; }
    public void setQuizScoresJson(String quizScoresJson) { this.quizScoresJson = quizScoresJson; }

    public int getTotalXp() { return totalXp; }
    public void setTotalXp(int totalXp) { this.totalXp = totalXp; }

    public int getCurrentStreakDays() { return currentStreakDays; }
    public void setCurrentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; }
}
