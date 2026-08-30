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

    public TopicController(TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping("/tracks")
    public ResponseEntity<List<Track>> getTracks() {
        return ResponseEntity.ok(topicService.getAllTracks());
    }

    @GetMapping("/tracks/{trackId}")
    public ResponseEntity<?> getTrackById(@PathVariable String trackId) {
        return topicService.getTrackById(trackId)
                .map(track -> {
                    List<Topic> trackTopics = topicService.getTopicsByTrack(trackId);
                    return ResponseEntity.ok(Map.of("track", track, "topics", trackTopics));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/topics")
    public ResponseEntity<List<Topic>> getTopics(
            @RequestParam(required = false) String trackId,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String q
    ) {
        return ResponseEntity.ok(topicService.getTopics(trackId, category, q));
    }

    @GetMapping("/topics/{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable String id) {
        return topicService.getTopicById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ==========================================
    // DYNAMIC CRUD & ADMIN ENDPOINTS
    // ==========================================

    @PostMapping("/topics")
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        Topic saved = topicService.saveTopic(topic);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/topics/{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable String id, @RequestBody Topic topic) {
        topic.setId(id);
        Topic saved = topicService.saveTopic(topic);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/topics/{id}")
    public ResponseEntity<Map<String, Object>> deleteTopic(@PathVariable String id) {
        boolean deleted = topicService.deleteTopic(id);
        return ResponseEntity.ok(Map.of("id", id, "deleted", deleted));
    }

    @PostMapping("/topics/reload")
    public ResponseEntity<Map<String, Object>> reloadTopics() {
        topicService.loadAllDataFromDisk();
        topicService.syncToDatabase();
        return ResponseEntity.ok(Map.of("status", "success", "message", "All topics and tracks reloaded into database & cache"));
    }
}
