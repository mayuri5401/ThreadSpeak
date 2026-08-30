package com.threadspeak.entity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.model.QuizQuestion;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quiz_questions")
public class QuizQuestionEntity {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Id
    @Column(name = "id", length = 100)
    private String id;

    @Column(name = "track_id")
    private String trackId;

    @Column(name = "topic_id")
    private String topicId;

    @Column(name = "category")
    private String category;

    @Column(name = "question", columnDefinition = "TEXT", nullable = false)
    private String question;

    @Column(name = "code_snippet", columnDefinition = "TEXT")
    private String codeSnippet;

    @Column(name = "options_json", columnDefinition = "TEXT")
    private String optionsJson;

    @Column(name = "correct_option_index")
    private int correctOptionIndex;

    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "difficulty")
    private String difficulty;

    public QuizQuestionEntity() {}

    public static QuizQuestionEntity fromModel(QuizQuestion q) {
        if (q == null) return null;
        QuizQuestionEntity entity = new QuizQuestionEntity();
        entity.setId(q.getId());
        entity.setTrackId(q.getTrackId());
        entity.setTopicId(q.getTopicId());
        entity.setCategory(q.getCategory());
        entity.setQuestion(q.getQuestion());
        entity.setCodeSnippet(q.getCodeSnippet());
        entity.setCorrectOptionIndex(q.getCorrectOptionIndex());
        entity.setExplanation(q.getExplanation());
        entity.setDifficulty(q.getDifficulty());
        try {
            entity.setOptionsJson(MAPPER.writeValueAsString(q.getOptions()));
        } catch (Exception ignored) {}
        return entity;
    }

    public QuizQuestion toModel() {
        QuizQuestion q = new QuizQuestion();
        q.setId(this.id);
        q.setTrackId(this.trackId);
        q.setTopicId(this.topicId);
        q.setCategory(this.category);
        q.setQuestion(this.question);
        q.setCodeSnippet(this.codeSnippet);
        q.setCorrectOptionIndex(this.correctOptionIndex);
        q.setExplanation(this.explanation);
        q.setDifficulty(this.difficulty);
        try {
            if (this.optionsJson != null) {
                q.setOptions(MAPPER.readValue(this.optionsJson, new TypeReference<List<String>>() {}));
            }
        } catch (Exception e) {
            q.setOptions(new ArrayList<>());
        }
        return q;
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

    public String getOptionsJson() { return optionsJson; }
    public void setOptionsJson(String optionsJson) { this.optionsJson = optionsJson; }

    public int getCorrectOptionIndex() { return correctOptionIndex; }
    public void setCorrectOptionIndex(int correctOptionIndex) { this.correctOptionIndex = correctOptionIndex; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
