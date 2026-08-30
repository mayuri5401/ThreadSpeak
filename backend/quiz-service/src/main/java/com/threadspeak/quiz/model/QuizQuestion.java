package com.threadspeak.quiz.model;

import java.util.List;

public class QuizQuestion {
    private String id;
    private String trackId;
    private String topicId;
    private String category;
    private String question;
    private String codeSnippet;
    private List<String> options;
    private int correctOptionIndex;
    private String explanation;
    private String difficulty;

    public QuizQuestion() {}

    public QuizQuestion(String id, String trackId, String topicId, String category, String question, 
                        String codeSnippet, List<String> options, int correctOptionIndex, 
                        String explanation, String difficulty) {
        this.id = id;
        this.trackId = trackId;
        this.topicId = topicId;
        this.category = category;
        this.question = question;
        this.codeSnippet = codeSnippet;
        this.options = options;
        this.correctOptionIndex = correctOptionIndex;
        this.explanation = explanation;
        this.difficulty = difficulty;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTrackId() { return trackId; }
    public void setTrackId(String trackId) { this.trackId = trackId; }

    public String getTopicId() { return topicId; }
    public void setTopicId(String topicId) { this.topicId = topicId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getCodeSnippet() { return codeSnippet; }
    public void setCodeSnippet(String codeSnippet) { this.codeSnippet = codeSnippet; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public int getCorrectOptionIndex() { return correctOptionIndex; }
    public void setCorrectOptionIndex(int correctOptionIndex) { this.correctOptionIndex = correctOptionIndex; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
