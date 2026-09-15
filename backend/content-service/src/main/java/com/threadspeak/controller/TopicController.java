package com.threadspeak.controller;

import com.threadspeak.model.Topic;
import com.threadspeak.model.Track;
import com.threadspeak.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TopicController {

    private final TopicService topicService;
    private final com.threadspeak.kafka.ContentKafkaProducer kafkaProducer;

    public TopicController(TopicService topicService, com.threadspeak.kafka.ContentKafkaProducer kafkaProducer) {
        this.topicService = topicService;
        this.kafkaProducer = kafkaProducer;
    }

    @GetMapping("/tracks")
    public ResponseEntity<List<Track>> getTracks() {
        return ResponseEntity.ok()
                .cacheControl(org.springframework.http.CacheControl.maxAge(30, java.util.concurrent.TimeUnit.MINUTES).cachePublic())
                .body(topicService.getAllTracks());
    }

    @GetMapping("/tracks/{trackId}")
    public ResponseEntity<?> getTrackById(@PathVariable String trackId) {
        return topicService.getTrackById(trackId)
                .map(track -> {
                    List<Topic> trackTopics = topicService.getTopicsByTrack(trackId);
                    return ResponseEntity.ok()
                            .cacheControl(org.springframework.http.CacheControl.maxAge(30, java.util.concurrent.TimeUnit.MINUTES).cachePublic())
                            .body(Map.of("track", track, "topics", trackTopics));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/topics")
    public ResponseEntity<List<Topic>> getTopics(
            @RequestParam(required = false) String trackId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String q
    ) {
        return ResponseEntity.ok()
                .cacheControl(org.springframework.http.CacheControl.maxAge(15, java.util.concurrent.TimeUnit.MINUTES).cachePublic())
                .body(topicService.getTopics(trackId, category, q));
    }

    @GetMapping("/topics/{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable String id) {
        return topicService.getTopicById(id)
                .map(topic -> {
                    kafkaProducer.publishContentEvent(new com.threadspeak.event.ContentEvent(
                            com.threadspeak.event.ContentEvent.EventType.TOPIC_VIEWED, id, topic.getTrackId()
                    ));
                    return ResponseEntity.ok()
                            .cacheControl(org.springframework.http.CacheControl.maxAge(30, java.util.concurrent.TimeUnit.MINUTES).cachePublic())
                            .body(topic);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ==========================================
    // DYNAMIC CRUD & ADMIN ENDPOINTS
    // ==========================================

    @PostMapping("/topics")
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        Topic saved = topicService.saveTopic(topic);
        kafkaProducer.publishContentEvent(new com.threadspeak.event.ContentEvent(
                com.threadspeak.event.ContentEvent.EventType.TOPIC_CREATED, saved.getId(), saved.getTrackId()
        ));
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/topics/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable String id, @RequestBody Topic topic) {
        topic.setId(id);
        Topic saved = topicService.saveTopic(topic);
        kafkaProducer.publishContentEvent(new com.threadspeak.event.ContentEvent(
                com.threadspeak.event.ContentEvent.EventType.TOPIC_UPDATED, saved.getId(), saved.getTrackId()
        ));
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/topics/{id}")
    public ResponseEntity<Map<String, Object>> deleteTopic(@PathVariable String id) {
        boolean deleted = topicService.deleteTopic(id);
        kafkaProducer.publishContentEvent(new com.threadspeak.event.ContentEvent(
                com.threadspeak.event.ContentEvent.EventType.TOPIC_DELETED, id, null
        ));
        return ResponseEntity.ok(Map.of("id", id, "deleted", deleted));
    }

    @PostMapping("/topics/reload")
    public ResponseEntity<Map<String, Object>> reloadTopics() {
        topicService.loadAllDataFromDisk();
        topicService.syncToDatabase();
        kafkaProducer.publishContentEvent(new com.threadspeak.event.ContentEvent(
                com.threadspeak.event.ContentEvent.EventType.CATALOG_RELOADED, null, null
        ));
        return ResponseEntity.ok(Map.of("status", "success", "message", "All topics and tracks reloaded into database & cache"));
    }
}
