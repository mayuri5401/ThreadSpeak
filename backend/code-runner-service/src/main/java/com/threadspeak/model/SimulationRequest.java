package com.threadspeak.model;

import java.util.Map;

public class SimulationRequest {
    private String type; // "jvm", "threads", "spring", "lru", "hld"
    private String action; // e.g. "allocate", "gc", "run_threads", "send_request", "cache_put", "cache_get", "traffic_spike"
    private Map<String, Object> params;

    public SimulationRequest() {}

    public SimulationRequest(String type, String action, Map<String, Object> params) {
        this.type = type;
        this.action = action;
        this.params = params;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public Map<String, Object> getParams() { return params; }
    public void setParams(Map<String, Object> params) { this.params = params; }
}
