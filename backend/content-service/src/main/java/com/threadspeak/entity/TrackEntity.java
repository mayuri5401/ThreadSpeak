package com.threadspeak.entity;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.model.Track;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tracks")
public class TrackEntity {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Id
    @Column(name = "id", length = 50)
    private String id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "short_title")
    private String shortTitle;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "icon")
    private String icon;

    @Column(name = "color")
    private String color;

    @Column(name = "badge")
    private String badge;

    @Column(name = "total_topics")
    private int totalTopics;

    @Column(name = "categories_json", columnDefinition = "TEXT")
    private String categoriesJson;

    public TrackEntity() {}

    public static TrackEntity fromModel(Track track) {
        if (track == null) return null;
        TrackEntity entity = new TrackEntity();
        entity.setId(track.getId());
        entity.setTitle(track.getTitle());
        entity.setShortTitle(track.getShortTitle());
        entity.setDescription(track.getDescription());
        entity.setIcon(track.getIcon());
        entity.setColor(track.getColor());
        entity.setBadge(track.getBadge());
        entity.setTotalTopics(track.getTotalTopics());
        try {
            entity.setCategoriesJson(MAPPER.writeValueAsString(track.getCategories()));
        } catch (Exception ignored) {}
        return entity;
    }

    public Track toModel() {
        Track track = new Track();
        track.setId(this.id);
        track.setTitle(this.title);
        track.setShortTitle(this.shortTitle);
        track.setDescription(this.description);
        track.setIcon(this.icon);
        track.setColor(this.color);
        track.setBadge(this.badge);
        track.setTotalTopics(this.totalTopics);
        try {
            if (this.categoriesJson != null) {
                track.setCategories(MAPPER.readValue(this.categoriesJson, new TypeReference<List<String>>() {}));
            }
        } catch (Exception e) {
            track.setCategories(new ArrayList<>());
        }
        return track;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getShortTitle() { return shortTitle; }
    public void setShortTitle(String shortTitle) { this.shortTitle = shortTitle; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public int getTotalTopics() { return totalTopics; }
    public void setTotalTopics(int totalTopics) { this.totalTopics = totalTopics; }

    public String getCategoriesJson() { return categoriesJson; }
    public void setCategoriesJson(String categoriesJson) { this.categoriesJson = categoriesJson; }
}
