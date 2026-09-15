package com.threadspeak.user.event;

import java.io.Serializable;

public class QuizCompletedEvent implements Serializable {
    private String userId;
    private String topicOrTrackId;
    private int correctCount;
    private int totalQuestions;
    private int xpEarned;
    private String timestamp;

    public QuizCompletedEvent() {}

    public QuizCompletedEvent(String userId, String topicOrTrackId, int correctCount, int totalQuestions, int xpEarned) {
        this.userId = userId;
        this.topicOrTrackId = topicOrTrackId;
        this.correctCount = correctCount;
        this.totalQuestions = totalQuestions;
        this.xpEarned = xpEarned;
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getTopicOrTrackId() { return topicOrTrackId; }
    public void setTopicOrTrackId(String topicOrTrackId) { this.topicOrTrackId = topicOrTrackId; }

    public int getCorrectCount() { return correctCount; }
    public void setCorrectCount(int correctCount) { this.correctCount = correctCount; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public int getXpEarned() { return xpEarned; }
    public void setXpEarned(int xpEarned) { this.xpEarned = xpEarned; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
