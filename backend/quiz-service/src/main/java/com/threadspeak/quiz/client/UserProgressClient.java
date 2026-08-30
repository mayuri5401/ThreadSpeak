package com.threadspeak.quiz.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service", fallback = UserProgressClientFallback.class)
public interface UserProgressClient {

    @PostMapping("/api/progress/{userId}/quiz-score")
    Object recordQuizScore(
            @PathVariable("userId") String userId,
            @RequestParam("topicOrTrackId") String topicOrTrackId,
            @RequestParam("score") int score,
            @RequestParam("xp") int xp
    );
}
