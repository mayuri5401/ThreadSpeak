package com.threadspeak.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLMapper;
import com.threadspeak.entity.TopicEntity;
import com.threadspeak.entity.TrackEntity;
import com.threadspeak.model.Topic;
import com.threadspeak.model.Track;
import com.threadspeak.repository.TopicRepository;
import com.threadspeak.repository.TrackRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final TrackRepository trackRepository;
    private final HtmlImporterService htmlImporterService;
    private final ObjectMapper mapper;
    private final YAMLMapper yamlMapper;

    // Fast in-memory cache preserving insertion order
    private final List<Track> tracks = Collections.synchronizedList(new ArrayList<>());
    private final Map<String, Topic> topicsMap = Collections.synchronizedMap(new LinkedHashMap<>());
    
    // Tier-1 Precomputed Track Topics Cache for O(1) Instant Retrival
    private final Map<String, List<Topic>> precomputedTrackTopics = new ConcurrentHashMap<>();

    public TopicService(TopicRepository topicRepository, TrackRepository trackRepository, HtmlImporterService htmlImporterService) {
        this.topicRepository = topicRepository;
        this.trackRepository = trackRepository;
        this.htmlImporterService = htmlImporterService;
        this.mapper = new ObjectMapper();
        this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        this.yamlMapper = new YAMLMapper();
        this.yamlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @PostConstruct
    public void initData() {
        loadAllDataFromDisk();

        // Async Database synchronization
        CompletableFuture.runAsync(this::syncToDatabase);
    }

    /**
     * Loads tracks and all curriculum topics from modular Markdown files and JSON catalogs.
     * Evicts all Spring & Caffeine caches on reload.
     */
    @CacheEvict(value = {"tracks", "topics", "track_topics", "search_topics"}, allEntries = true)
    public synchronized void loadAllDataFromDisk() {
        tracks.clear();
        topicsMap.clear();
        precomputedTrackTopics.clear();

        loadTracksFromJson();
        loadModularMarkdownFiles(); // Modular Markdown (.md) curriculum
        loadSystemDesignJson();

        // Precompute Tier-1 Track Caches for sub-millisecond O(1) queries
        for (Track track : tracks) {
            String tid = track.getId().toLowerCase();
            List<Topic> trackTopics = topicsMap.values().stream()
                    .filter(t -> tid.equalsIgnoreCase(t.getTrackId()))
                    .collect(Collectors.toUnmodifiableList());
            precomputedTrackTopics.put(tid, trackTopics);
        }

        System.out.println(">>> [TopicService] Loaded & Pre-cached " + tracks.size() + " tracks, " + precomputedTrackTopics.size() + " track partitions, and " + topicsMap.size() + " topics into active cache.");
    }

    private void loadTracksFromJson() {
        try (InputStream is = getClass().getResourceAsStream("/data/tracks.json")) {
            if (is != null) {
                List<Track> loadedTracks = mapper.readValue(is, new TypeReference<List<Track>>() {});
                tracks.addAll(loadedTracks);
            }
        } catch (Exception e) {
            System.err.println("Error reading tracks.json: " + e.getMessage());
        }
    }

    /**
     * Scans and loads individual modular Markdown (.md) curriculum topic files.
     * Extracts YAML frontmatter for metadata and markdown body for deep dive notes.
     */
    private void loadModularMarkdownFiles() {
        int mdCount = 0;
        try {
            File diskDir = new File("d:/ThreadSpeak/backend/content-service/src/main/resources/curriculum");
            if (diskDir.exists()) {
                mdCount = scanMarkdownDirectory(diskDir);
            } else {
                PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
                Resource[] resources = resolver.getResources("classpath*:curriculum/**/*.md");

                if (resources != null) {
                    Arrays.sort(resources, Comparator.comparing(r -> {
                        try {
                            return r.getURL().toString();
                        } catch (Exception e) {
                            return r.getFilename();
                        }
                    }));
                    for (Resource resource : resources) {
                        try (InputStream is = resource.getInputStream()) {
                            String content = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                            if (parseAndRegisterMarkdownTopic(content)) {
                                mdCount++;
                            }
                        } catch (Exception ex) {
                            System.err.println("Error reading classpath markdown " + resource.getFilename() + ": " + ex.getMessage());
                        }
                    }
                }
            }

            System.out.println(">>> [TopicService] Successfully parsed & registered " + mdCount + " modular Markdown curriculum topics in order.");
        } catch (Exception e) {
            System.err.println("Error loading modular markdown curriculum: " + e.getMessage());
        }
    }

    private int scanMarkdownDirectory(File dir) {
        int count = 0;
        File[] files = dir.listFiles();
        if (files == null) return 0;
        Arrays.sort(files, Comparator.comparing(File::getName));

        for (File file : files) {
            if (file.isDirectory()) {
                count += scanMarkdownDirectory(file);
            } else if (file.getName().endsWith(".md")) {
                try {
                    String content = Files.readString(file.toPath(), StandardCharsets.UTF_8);
                    if (parseAndRegisterMarkdownTopic(content)) {
                        count++;
                    }
                } catch (Exception e) {
                    System.err.println("Error reading markdown file " + file.getAbsolutePath() + ": " + e.getMessage());
                }
            }
        }
        return count;
    }

    private static final java.util.regex.Pattern FRONTMATTER_DELIMITER_PATTERN = 
            java.util.regex.Pattern.compile("(?m)^---[ \\t]*\\r?$");

    private boolean parseAndRegisterMarkdownTopic(String content) {
        if (content == null || !content.trim().startsWith("---")) return false;

        java.util.regex.Matcher matcher = FRONTMATTER_DELIMITER_PATTERN.matcher(content);
        if (matcher.find()) {
            int firstEnd = matcher.end();
            if (matcher.find()) {
                int secondStart = matcher.start();
                int secondEnd = matcher.end();

                String yamlPart = content.substring(firstEnd, secondStart).trim();
                String markdownBody = content.substring(secondEnd).trim();

                try {
                    Topic topic = yamlMapper.readValue(yamlPart, Topic.class);
                    if (topic != null && topic.getId() != null) {
                        if (markdownBody != null && !markdownBody.isEmpty()) {
                            topic.setDeepDive(markdownBody);
                        }
                        topicsMap.put(topic.getId(), topic);
                        return true;
                    }
                } catch (Exception e) {
                    System.err.println("Error parsing YAML frontmatter: " + e.getMessage());
                }
            }
        }
        return false;
    }

    private void loadSystemDesignJson() {
        try {
            InputStream is = getClass().getResourceAsStream("/data/system_design_topics.json");
            List<Topic> systemDesignTopics = null;
            if (is != null) {
                systemDesignTopics = mapper.readValue(is, new TypeReference<List<Topic>>() {});
                is.close();
            } else {
                File f = new File("d:/ThreadSpeak/backend/content-service/src/main/resources/data/system_design_topics.json");
                if (f.exists()) {
                    systemDesignTopics = mapper.readValue(f, new TypeReference<List<Topic>>() {});
                }
            }

            if (systemDesignTopics != null) {
                for (Topic t : systemDesignTopics) {
                    topicsMap.put(t.getId(), t);
                }
                System.out.println(">>> SUCCESS: Loaded " + systemDesignTopics.size() + " system design topics into in-memory topicsMap cache.");
            }
        } catch (Exception e) {
            System.err.println("Error loading system design json into memory: " + e.getMessage());
        }
    }

    /**
     * Synchronizes in-memory tracks and topics to database entities.
     */
    public void syncToDatabase() {
        try {
            List<TrackEntity> trackEntities = tracks.stream().map(TrackEntity::fromModel).collect(Collectors.toList());
            trackRepository.saveAll(trackEntities);

            List<TopicEntity> topicEntities = topicsMap.values().stream().map(TopicEntity::fromModel).collect(Collectors.toList());
            topicRepository.saveAll(topicEntities);
            System.out.println(">>> [TopicService] Synced " + topicEntities.size() + " topics to database.");
        } catch (Exception e) {
            System.err.println("Error syncing data to database: " + e.getMessage());
        }
    }

    @Cacheable(value = "tracks")
    public List<Track> getAllTracks() {
        return new ArrayList<>(tracks);
    }

    @Cacheable(value = "tracks", key = "#trackId")
    public Optional<Track> getTrackById(String trackId) {
        if (trackId == null) return Optional.empty();
        return tracks.stream()
                .filter(t -> trackId.equalsIgnoreCase(t.getId()))
                .findFirst();
    }

    @Cacheable(value = "topics")
    public List<Topic> getAllTopics() {
        return new ArrayList<>(topicsMap.values());
    }

    public List<Topic> getTopicsByTrack(String trackId) {
        return getTopicsByTrackId(trackId);
    }

    @Cacheable(value = "track_topics", key = "#trackId")
    public List<Topic> getTopicsByTrackId(String trackId) {
        if (trackId == null || trackId.isBlank()) {
            return getAllTopics();
        }
        List<Topic> cached = precomputedTrackTopics.get(trackId.toLowerCase());
        if (cached != null) {
            return cached;
        }
        return topicsMap.values().stream()
                .filter(t -> trackId.equalsIgnoreCase(t.getTrackId()))
                .collect(Collectors.toList());
    }

    @Cacheable(value = "search_topics", key = "(#trackId ?: 'all') + '_' + (#category ?: 'all') + '_' + (#q ?: '')")
    public List<Topic> getTopics(String trackId, String category, String q) {
        if ((category == null || category.isBlank()) && (q == null || q.isBlank()) && trackId != null && !trackId.isBlank()) {
            return getTopicsByTrackId(trackId);
        }
        return topicsMap.values().stream()
                .filter(t -> trackId == null || trackId.isBlank() || trackId.equalsIgnoreCase(t.getTrackId()))
                .filter(t -> category == null || category.isBlank() || category.equalsIgnoreCase(t.getCategory()))
                .filter(t -> {
                    if (q == null || q.isBlank()) return true;
                    String query = q.toLowerCase().trim();
                    return (t.getTitle() != null && t.getTitle().toLowerCase().contains(query)) ||
                           (t.getSummary() != null && t.getSummary().toLowerCase().contains(query)) ||
                           (t.getTags() != null && t.getTags().stream().anyMatch(tag -> tag.toLowerCase().contains(query)));
                })
                .collect(Collectors.toList());
    }

    @Cacheable(value = "topics", key = "#id")
    public Optional<Topic> getTopicById(String id) {
        return Optional.ofNullable(topicsMap.get(id));
    }

    public List<Topic> searchTopics(String query) {
        return getTopics(null, null, query);
    }

    @CacheEvict(value = {"tracks", "topics", "track_topics", "search_topics"}, allEntries = true)
    public Topic saveTopic(Topic topic) {
        if (topic.getId() == null || topic.getId().isBlank()) {
            topic.setId("topic-" + System.currentTimeMillis());
        }
        topicsMap.put(topic.getId(), topic);
        if (topic.getTrackId() != null) {
            precomputedTrackTopics.computeIfPresent(topic.getTrackId().toLowerCase(), (k, v) -> {
                List<Topic> updated = new ArrayList<>(v);
                updated.removeIf(t -> t.getId().equals(topic.getId()));
                updated.add(topic);
                return Collections.unmodifiableList(updated);
            });
        }
        try {
            topicRepository.save(TopicEntity.fromModel(topic));
        } catch (Exception e) {
            System.err.println("Warning: Could not save topic to DB: " + e.getMessage());
        }
        return topic;
    }

    @CacheEvict(value = {"tracks", "topics", "track_topics", "search_topics"}, allEntries = true)
    public boolean deleteTopic(String id) {
        if (topicsMap.containsKey(id)) {
            Topic removed = topicsMap.remove(id);
            if (removed != null && removed.getTrackId() != null) {
                precomputedTrackTopics.computeIfPresent(removed.getTrackId().toLowerCase(), (k, v) -> {
                    List<Topic> updated = new ArrayList<>(v);
                    updated.removeIf(t -> t.getId().equals(id));
                    return Collections.unmodifiableList(updated);
                });
            }

                        try {
                topicRepository.deleteById(id);
            } catch (Exception e) {
                System.err.println("Warning: Could not delete topic from DB: " + e.getMessage());
            }
            return true;
        }
        return false;
    }
}
