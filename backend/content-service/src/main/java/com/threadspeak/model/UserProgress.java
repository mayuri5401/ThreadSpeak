package com.threadspeak.model;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class UserProgress {
    private String userId;
    private Set<String> completedTopicIds = new HashSet<>();
    private Set<String> bookmarkedTopicIds = new HashSet<>();
    private Map<String, Integer> quizScores; // topicId/trackId -> score
    private int totalXp;
    private int currentStreakDays;

    public UserProgress() {}

    public UserProgress(String userId, Set<String> completedTopicIds, Set<String> bookmarkedTopicIds, Map<String, Integer> quizScores, int totalXp, int currentStreakDays) {
        this.userId = userId;
        this.completedTopicIds = completedTopicIds != null ? completedTopicIds : new HashSet<>();
        this.bookmarkedTopicIds = bookmarkedTopicIds != null ? bookmarkedTopicIds : new HashSet<>();
        this.quizScores = quizScores;
        this.totalXp = totalXp;
        this.currentStreakDays = currentStreakDays;
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public Set<String> getCompletedTopicIds() { return completedTopicIds; }
    public void setCompletedTopicIds(Set<String> completedTopicIds) { this.completedTopicIds = completedTopicIds; }

    public Set<String> getBookmarkedTopicIds() { return bookmarkedTopicIds; }
    public void setBookmarkedTopicIds(Set<String> bookmarkedTopicIds) { this.bookmarkedTopicIds = bookmarkedTopicIds; }

    public Map<String, Integer> getQuizScores() { return quizScores; }
    public void setQuizScores(Map<String, Integer> quizScores) { this.quizScores = quizScores; }

    public int getTotalXp() { return totalXp; }
    public void setTotalXp(int totalXp) { this.totalXp = totalXp; }

    public int getCurrentStreakDays() { return currentStreakDays; }
    public void setCurrentStreakDays(int currentStreakDays) { this.currentStreakDays = currentStreakDays; }
}
