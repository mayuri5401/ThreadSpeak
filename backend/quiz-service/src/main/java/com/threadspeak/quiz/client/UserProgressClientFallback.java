package com.threadspeak.quiz.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class UserProgressClientFallback implements UserProgressClient {

    private static final Logger log = LoggerFactory.getLogger(UserProgressClientFallback.class);

    @Override
    public Object recordQuizScore(String userId, String topicOrTrackId, int score, int xp) {
        log.warn("[FEIGN-FALLBACK] User service unavailable. Failed to persist quiz score for user: {}", userId);
        return null;
    }
}
