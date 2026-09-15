package com.threadspeak.event;

import java.io.Serializable;
import java.time.Instant;

public class CodeExecutionTelemetryEvent implements Serializable {
    private String topicId;
    private String language;
    private long executionDurationMs;
    private boolean success;
    private int exitCode;
    private String errorType;
    private String timestamp;

    public CodeExecutionTelemetryEvent() {
        this.timestamp = Instant.now().toString();
    }

    public CodeExecutionTelemetryEvent(String topicId, String language, long executionDurationMs, boolean success, int exitCode, String errorType) {
        this.topicId = topicId;
        this.language = language;
        this.executionDurationMs = executionDurationMs;
        this.success = success;
        this.exitCode = exitCode;
        this.errorType = errorType;
        this.timestamp = Instant.now().toString();
    }

    public String getTopicId() { return topicId; }
    public void setTopicId(String topicId) { this.topicId = topicId; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public long getExecutionDurationMs() { return executionDurationMs; }
    public void setExecutionDurationMs(long executionDurationMs) { this.executionDurationMs = executionDurationMs; }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public int getExitCode() { return exitCode; }
    public void setExitCode(int exitCode) { this.exitCode = exitCode; }

    public String getErrorType() { return errorType; }
    public void setErrorType(String errorType) { this.errorType = errorType; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
