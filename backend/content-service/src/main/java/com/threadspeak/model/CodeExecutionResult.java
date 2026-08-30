package com.threadspeak.model;

import java.util.List;
import java.util.Map;

public class CodeExecutionResult {
    private boolean success;
    private String output;
    private String error;
    private long executionTimeMs;
    private List<String> stdoutLines;
    private List<Map<String, Object>> traceSteps;
    private String scenarioInsight;

    public CodeExecutionResult() {}

    public CodeExecutionResult(boolean success, String output, String error, long executionTimeMs, 
                               List<String> stdoutLines, List<Map<String, Object>> traceSteps, String scenarioInsight) {
        this.success = success;
        this.output = output;
        this.error = error;
        this.executionTimeMs = executionTimeMs;
        this.stdoutLines = stdoutLines;
        this.traceSteps = traceSteps;
        this.scenarioInsight = scenarioInsight;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(long executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public List<String> getStdoutLines() { return stdoutLines; }
    public void setStdoutLines(List<String> stdoutLines) { this.stdoutLines = stdoutLines; }

    public List<Map<String, Object>> getTraceSteps() { return traceSteps; }
    public void setTraceSteps(List<Map<String, Object>> traceSteps) { this.traceSteps = traceSteps; }

    public String getScenarioInsight() { return scenarioInsight; }
    public void setScenarioInsight(String scenarioInsight) { this.scenarioInsight = scenarioInsight; }
}
