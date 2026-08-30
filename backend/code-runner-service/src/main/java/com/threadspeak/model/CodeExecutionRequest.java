package com.threadspeak.model;

import java.util.Map;

public class CodeExecutionRequest {
    private String scenarioId;
    private String code;
    private Map<String, String> files;
    private String language;
    private Map<String, Object> executionFlags;

    private String stdin;

    public CodeExecutionRequest() {}

    public CodeExecutionRequest(String scenarioId, String code, Map<String, String> files, String language, Map<String, Object> executionFlags, String stdin) {
        this.scenarioId = scenarioId;
        this.code = code;
        this.files = files;
        this.language = language;
        this.executionFlags = executionFlags;
        this.stdin = stdin;
    }

    public String getScenarioId() { return scenarioId; }
    public void setScenarioId(String scenarioId) { this.scenarioId = scenarioId; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public Map<String, String> getFiles() { return files; }
    public void setFiles(Map<String, String> files) { this.files = files; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public Map<String, Object> getExecutionFlags() { return executionFlags; }
    public void setExecutionFlags(Map<String, Object> executionFlags) { this.executionFlags = executionFlags; }

    public String getStdin() { return stdin; }
    public void setStdin(String stdin) { this.stdin = stdin; }
}
