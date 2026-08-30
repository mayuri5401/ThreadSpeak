package com.threadspeak.user.controller;

import com.threadspeak.user.model.UserProgress;
import com.threadspeak.user.service.UserProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/progress")
public class UserProgressController {

    private final UserProgressService userProgressService;

    public UserProgressController(UserProgressService userProgressService) {
        this.userProgressService = userProgressService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserProgress> getProgress(@PathVariable String userId) {
        return ResponseEntity.ok(userProgressService.getProgress(userId));
    }

    @PostMapping("/{userId}/complete/{topicId}")
    public ResponseEntity<UserProgress> completeTopic(@PathVariable String userId, @PathVariable String topicId) {
        return ResponseEntity.ok(userProgressService.completeTopic(userId, topicId));
    }

    @PostMapping("/{userId}/bookmark/{topicId}")
    public ResponseEntity<UserProgress> toggleBookmark(@PathVariable String userId, @PathVariable String topicId) {
        return ResponseEntity.ok(userProgressService.toggleBookmark(userId, topicId));
    }

    @PostMapping("/{userId}/xp")
    public ResponseEntity<UserProgress> addXp(@PathVariable String userId, @RequestBody Map<String, Integer> body) {
        int xp = body != null ? body.getOrDefault("xp", 0) : 0;
        return ResponseEntity.ok(userProgressService.addXp(userId, xp));
    }

    @PostMapping("/{userId}/quiz-score")
    public ResponseEntity<UserProgress> recordQuizScore(
            @PathVariable String userId,
            @RequestParam String topicOrTrackId,
            @RequestParam int score,
            @RequestParam int xp) {
        return ResponseEntity.ok(userProgressService.recordQuizScore(userId, topicOrTrackId, score, xp));
    }
}
