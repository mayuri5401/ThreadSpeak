package com.threadspeak.model;

import java.util.List;

public class Track {
    private String id;
    private String title;
    private String shortTitle;
    private String description;
    private String icon;
    private String color;
    private String badge;
    private int totalTopics;
    private List<String> categories;

    public Track() {}

    public Track(String id, String title, String shortTitle, String description, String icon, String color, String badge, int totalTopics, List<String> categories) {
        this.id = id;
        this.title = title;
        this.shortTitle = shortTitle;
        this.description = description;
        this.icon = icon;
        this.color = color;
        this.badge = badge;
        this.totalTopics = totalTopics;
        this.categories = categories;
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

    public List<String> getCategories() { return categories; }
    public void setCategories(List<String> categories) { this.categories = categories; }
}
