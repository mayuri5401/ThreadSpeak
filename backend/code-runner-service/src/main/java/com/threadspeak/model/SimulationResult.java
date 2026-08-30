package com.threadspeak.model;

import java.util.List;
import java.util.Map;

public class SimulationResult {
    private boolean success;
    private String statusMessage;
    private Map<String, Object> state;
    private List<String> logs;
    private Map<String, Object> metrics;
    private List<Map<String, Object>> stepFrames;

    public SimulationResult() {}

    public SimulationResult(boolean success, String statusMessage, Map<String, Object> state, 
                            List<String> logs, Map<String, Object> metrics, List<Map<String, Object>> stepFrames) {
        this.success = success;
        this.statusMessage = statusMessage;
        this.state = state;
        this.logs = logs;
        this.metrics = metrics;
        this.stepFrames = stepFrames;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getStatusMessage() { return statusMessage; }
    public void setStatusMessage(String statusMessage) { this.statusMessage = statusMessage; }

    public Map<String, Object> getState() { return state; }
    public void setState(Map<String, Object> state) { this.state = state; }

    public List<String> getLogs() { return logs; }
    public void setLogs(List<String> logs) { this.logs = logs; }

    public Map<String, Object> getMetrics() { return metrics; }
    public void setMetrics(Map<String, Object> metrics) { this.metrics = metrics; }

    public List<Map<String, Object>> getStepFrames() { return stepFrames; }
    public void setStepFrames(List<Map<String, Object>> stepFrames) { this.stepFrames = stepFrames; }
}
