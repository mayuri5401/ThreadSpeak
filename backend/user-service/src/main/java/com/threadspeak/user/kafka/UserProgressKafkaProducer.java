package com.threadspeak.user.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Component
public class UserProgressKafkaProducer {

    private static final Logger log = LoggerFactory.getLogger(UserProgressKafkaProducer.class);
    public static final String TOPIC_XP_AWARDED = "threadspeak.user.xp-awarded";

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public UserProgressKafkaProducer(@Autowired(required = false) KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishXpAwarded(String userId, int totalXp, int xpDelta, String source) {
        if (kafkaTemplate == null) return;

        CompletableFuture.runAsync(() -> {
            try {
                String payload = objectMapper.writeValueAsString(Map.of(
                        "userId", userId,
                        "totalXp", totalXp,
                        "xpDelta", xpDelta,
                        "source", source,
                        "timestamp", java.time.Instant.now().toString()
                ));
                kafkaTemplate.send(TOPIC_XP_AWARDED, userId, payload)
                        .whenComplete((res, ex) -> {
                            if (ex != null) {
                                log.debug("[Kafka-User] XP event skipped (Kafka offline): {}", ex.getMessage());
                            } else {
                                log.info("[Kafka-User] Published XP awarded event for {}: +{} XP (Total: {})", userId, xpDelta, totalXp);
                            }
                        });
            } catch (Exception e) {
                log.debug("[Kafka-User] Serialization failure: {}", e.getMessage());
            }
        });
    }
}
