package com.threadspeak.entity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.model.Topic;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "topics")
public class TopicEntity {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Id
    @Column(name = "id", length = 255)
    private String id;

    @Column(name = "track_id", nullable = false)
    private String trackId;

    @Column(name = "track_title")
    private String trackTitle;

    @Column(name = "category")
    private String category;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "slug")
    private String slug;

    @Column(name = "summary", columnDefinition = "TEXT")
    private String summary;

    @Column(name = "eli10", columnDefinition = "TEXT")
    private String eli10;

    @Column(name = "mental_model", columnDefinition = "TEXT")
    private String mentalModel;

    @Column(name = "deep_dive", columnDefinition = "TEXT")
    private String deepDive;

    @Column(name = "animation_type")
    private String animationType;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "estimated_minutes")
    private int estimatedMinutes;

    @Column(name = "interview_traps_json", columnDefinition = "TEXT")
    private String interviewTrapsJson;

    @Column(name = "code_snippet_json", columnDefinition = "TEXT")
    private String codeSnippetJson;

    @Column(name = "tags_json", columnDefinition = "TEXT")
    private String tagsJson;

    @Column(name = "interactive_steps_json", columnDefinition = "TEXT")
    private String interactiveStepsJson;

    public TopicEntity() {}

    public static TopicEntity fromModel(Topic topic) {
        if (topic == null) return null;
        TopicEntity entity = new TopicEntity();
        entity.setId(topic.getId());
        entity.setTrackId(topic.getTrackId());
        entity.setTrackTitle(topic.getTrackTitle());
        entity.setCategory(topic.getCategory());
        entity.setTitle(topic.getTitle());
        entity.setSlug(topic.getSlug());
        entity.setSummary(topic.getSummary());
        entity.setEli10(topic.getEli10());
        entity.setMentalModel(topic.getMentalModel());
        entity.setDeepDive(topic.getDeepDive());
        entity.setAnimationType(topic.getAnimationType());
        entity.setDifficulty(topic.getDifficulty());
        entity.setEstimatedMinutes(topic.getEstimatedMinutes());

        try {
            entity.setInterviewTrapsJson(MAPPER.writeValueAsString(topic.getInterviewTraps()));
            entity.setCodeSnippetJson(MAPPER.writeValueAsString(topic.getCodeSnippet()));
            entity.setTagsJson(MAPPER.writeValueAsString(topic.getTags()));
            entity.setInteractiveStepsJson(MAPPER.writeValueAsString(topic.getInteractiveSteps()));
        } catch (Exception e) {
            // fallback
        }
        return entity;
    }

    public Topic toModel() {
        Topic topic = new Topic();
        topic.setId(this.id);
        topic.setTrackId(this.trackId);
        topic.setTrackTitle(this.trackTitle);
        topic.setCategory(this.category);
        topic.setTitle(this.title);
        topic.setSlug(this.slug);
        topic.setSummary(this.summary);
        topic.setEli10(this.eli10);
        topic.setMentalModel(this.mentalModel);
        topic.setDeepDive(this.deepDive);
        topic.setAnimationType(this.animationType);
        topic.setDifficulty(this.difficulty);
        topic.setEstimatedMinutes(this.estimatedMinutes);

        try {
            if (this.interviewTrapsJson != null) {
                topic.setInterviewTraps(MAPPER.readValue(this.interviewTrapsJson, new TypeReference<List<Topic.InterviewTrap>>() {}));
            }
            if (this.codeSnippetJson != null) {
                topic.setCodeSnippet(MAPPER.readValue(this.codeSnippetJson, Topic.CodeSnippet.class));
            }
            if (this.tagsJson != null) {
                topic.setTags(MAPPER.readValue(this.tagsJson, new TypeReference<List<String>>() {}));
            }
            if (this.interactiveStepsJson != null) {
                topic.setInteractiveSteps(MAPPER.readValue(this.interactiveStepsJson, new TypeReference<List<Topic.InteractiveStep>>() {}));
            }
        } catch (Exception e) {
            // graceful fallback to empty lists
            if (topic.getInterviewTraps() == null) topic.setInterviewTraps(new ArrayList<>());
            if (topic.getTags() == null) topic.setTags(new ArrayList<>());
            if (topic.getInteractiveSteps() == null) topic.setInteractiveSteps(new ArrayList<>());
        }
        return topic;
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

    public String getAnimationType() { return animationType; }
    public void setAnimationType(String animationType) { this.animationType = animationType; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getEstimatedMinutes() { return estimatedMinutes; }
    public void setEstimatedMinutes(int estimatedMinutes) { this.estimatedMinutes = estimatedMinutes; }

    public String getInterviewTrapsJson() { return interviewTrapsJson; }
    public void setInterviewTrapsJson(String interviewTrapsJson) { this.interviewTrapsJson = interviewTrapsJson; }

    public String getCodeSnippetJson() { return codeSnippetJson; }
    public void setCodeSnippetJson(String codeSnippetJson) { this.codeSnippetJson = codeSnippetJson; }

    public String getTagsJson() { return tagsJson; }
    public void setTagsJson(String tagsJson) { this.tagsJson = tagsJson; }

    public String getInteractiveStepsJson() { return interactiveStepsJson; }
    public void setInteractiveStepsJson(String interactiveStepsJson) { this.interactiveStepsJson = interactiveStepsJson; }
}
