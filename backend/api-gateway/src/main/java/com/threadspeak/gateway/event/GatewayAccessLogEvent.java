package com.threadspeak.gateway.event;

import java.io.Serializable;
import java.time.Instant;

public class GatewayAccessLogEvent implements Serializable {
    private String correlationId;
    private String path;
    private String method;
    private int statusCode;
    private long durationMs;
    private String clientIp;
    private String timestamp;

    public GatewayAccessLogEvent() {
        this.timestamp = Instant.now().toString();
    }

    public GatewayAccessLogEvent(String correlationId, String path, String method, int statusCode, long durationMs, String clientIp) {
        this.correlationId = correlationId;
        this.path = path;
        this.method = method;
        this.statusCode = statusCode;
        this.durationMs = durationMs;
        this.clientIp = clientIp;
        this.timestamp = Instant.now().toString();
    }

    public String getCorrelationId() { return correlationId; }
    public void setCorrelationId(String correlationId) { this.correlationId = correlationId; }

    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }

    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }

    public int getStatusCode() { return statusCode; }
    public void setStatusCode(int statusCode) { this.statusCode = statusCode; }

    public long getDurationMs() { return durationMs; }
    public void setDurationMs(long durationMs) { this.durationMs = durationMs; }

    public String getClientIp() { return clientIp; }
    public void setClientIp(String clientIp) { this.clientIp = clientIp; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
