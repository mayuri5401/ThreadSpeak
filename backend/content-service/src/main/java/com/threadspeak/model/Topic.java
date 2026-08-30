package com.threadspeak.model;

import java.util.List;
import java.util.Map;

public class Topic {
    private String id;
    private String trackId;
    private String trackTitle;
    private String category;
    private String title;
    private String slug;
    private String summary;
    private String eli10; // Explain Like I'm 10 simple mental model
    private String mentalModel;
    private String deepDive;
    private List<InterviewTrap> interviewTraps;
    private CodeSnippet codeSnippet;
    private String animationType; // "jvm-memory", "multithreading", "spring-pipeline", "lru-cache", "hld-traffic", "generic-flow"
    private List<String> tags;
    private String difficulty; // "Beginner", "Intermediate", "Advanced"
    private int estimatedMinutes;
    private List<InteractiveStep> interactiveSteps;

    public Topic() {}

    public Topic(String id, String trackId, String trackTitle, String category, String title, 
                 String slug, String summary, String eli10, String mentalModel, String deepDive, 
                 List<InterviewTrap> interviewTraps, CodeSnippet codeSnippet, String animationType, 
                 List<String> tags, String difficulty, int estimatedMinutes, List<InteractiveStep> interactiveSteps) {
        this.id = id;
        this.trackId = trackId;
        this.trackTitle = trackTitle;
        this.category = category;
        this.title = title;
        this.slug = slug;
        this.summary = summary;
        this.eli10 = eli10;
        this.mentalModel = mentalModel;
        this.deepDive = deepDive;
        this.interviewTraps = interviewTraps;
        this.codeSnippet = codeSnippet;
        this.animationType = animationType;
        this.tags = tags;
        this.difficulty = difficulty;
        this.estimatedMinutes = estimatedMinutes;
        this.interactiveSteps = interactiveSteps;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTrackId() { return trackId; }
    public void setTrackId(String trackId) { this.trackId = trackId; }

    public String getTrackTitle() { return trackTitle; }
    public void setTrackTitle(String trackTitle) { this.trackTitle = trackTitle; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getEli10() { return eli10; }
    public void setEli10(String eli10) { this.eli10 = eli10; }

    public String getMentalModel() { return mentalModel; }
    public void setMentalModel(String mentalModel) { this.mentalModel = mentalModel; }

    public String getDeepDive() { return deepDive; }
    public void setDeepDive(String deepDive) { this.deepDive = deepDive; }

    public List<InterviewTrap> getInterviewTraps() { return interviewTraps; }
    public void setInterviewTraps(List<InterviewTrap> interviewTraps) { this.interviewTraps = interviewTraps; }

    public CodeSnippet getCodeSnippet() { return codeSnippet; }
    public void setCodeSnippet(CodeSnippet codeSnippet) { this.codeSnippet = codeSnippet; }

    public String getAnimationType() { return animationType; }
    public void setAnimationType(String animationType) { this.animationType = animationType; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(int estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }

    public List<InteractiveStep> getInteractiveSteps() { return interactiveSteps; }
    public void setInteractiveSteps(List<InteractiveStep> interactiveSteps) { this.interactiveSteps = interactiveSteps; }

    // Nested Helper Classes
    public static class InterviewTrap {
        private String question;
        private String trap;
        private String solution;
        private String codeFix;

        public InterviewTrap() {}
        public InterviewTrap(String question, String trap, String solution, String codeFix) {
            this.question = question;
            this.trap = trap;
            this.solution = solution;
            this.codeFix = codeFix;
        }
        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
        public String getTrap() { return trap; }
        public void setTrap(String trap) { this.trap = trap; }
        public String getSolution() { return solution; }
        public void setSolution(String solution) { this.solution = solution; }
        public String getCodeFix() { return codeFix; }
        public void setCodeFix(String codeFix) { this.codeFix = codeFix; }
    }

    public static class CodeSnippet {
        private String language;
        private String code;
        private String explanation;
        private Map<String, String> keyHighlights;

        public CodeSnippet() {}
        public CodeSnippet(String language, String code, String explanation, Map<String, String> keyHighlights) {
            this.language = language;
            this.code = code;
            this.explanation = explanation;
            this.keyHighlights = keyHighlights;
        }
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
        public Map<String, String> getKeyHighlights() { return keyHighlights; }
        public void setKeyHighlights(Map<String, String> keyHighlights) { this.keyHighlights = keyHighlights; }
    }

    public static class InteractiveStep {
        private int stepNumber;
        private String title;
        private String description;
        private String highlightedComponent;

        public InteractiveStep() {}
        public InteractiveStep(int stepNumber, String title, String description, String highlightedComponent) {
            this.stepNumber = stepNumber;
            this.title = title;
            this.description = description;
            this.highlightedComponent = highlightedComponent;
        }
        public int getStepNumber() { return stepNumber; }
        public void setStepNumber(int stepNumber) { this.stepNumber = stepNumber; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getHighlightedComponent() { return highlightedComponent; }
        public void setHighlightedComponent(String highlightedComponent) { this.highlightedComponent = highlightedComponent; }
    }
}
