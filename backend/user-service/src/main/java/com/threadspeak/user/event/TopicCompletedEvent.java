package com.threadspeak.user.event;

import java.io.Serializable;
import java.time.Instant;

public class TopicCompletedEvent implements Serializable {
    private String userId;
    private String topicId;
    private String trackId;
    private int xpGranted;
    private String timestamp;

    public TopicCompletedEvent() {
        this.timestamp = Instant.now().toString();
    }

    public TopicCompletedEvent(String userId, String topicId, String trackId, int xpGranted) {
        this.userId = userId;
        this.topicId = topicId;
        this.trackId = trackId;
        this.xpGranted = xpGranted;
        this.timestamp = Instant.now().toString();
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getTopicId() { return topicId; }
    public void setTopicId(String topicId) { this.topicId = topicId; }

    public String getTrackId() { return trackId; }
    public void setTrackId(String trackId) { this.trackId = trackId; }

    public int getXpGranted() { return xpGranted; }
    public void setXpGranted(int xpGranted) { this.xpGranted = xpGranted; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
