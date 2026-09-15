package com.threadspeak.event;

import java.io.Serializable;
import java.time.Instant;

public class ContentEvent implements Serializable {
    public enum EventType {
        TOPIC_VIEWED,
        TOPIC_CREATED,
        TOPIC_UPDATED,
        TOPIC_DELETED,
        CATALOG_RELOADED
    }

    private EventType eventType;
    private String topicId;
    private String trackId;
    private String timestamp;

    public ContentEvent() {
        this.timestamp = Instant.now().toString();
    }

    public ContentEvent(EventType eventType, String topicId, String trackId) {
        this.eventType = eventType;
        this.topicId = topicId;
        this.trackId = trackId;
        this.timestamp = Instant.now().toString();
    }

    public EventType getEventType() { return eventType; }
    public void setEventType(EventType eventType) { this.eventType = eventType; }

    public String getTopicId() { return topicId; }
    public void setTopicId(String topicId) { this.topicId = topicId; }

    public String getTrackId() { return trackId; }
    public void setTrackId(String trackId) { this.trackId = trackId; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
