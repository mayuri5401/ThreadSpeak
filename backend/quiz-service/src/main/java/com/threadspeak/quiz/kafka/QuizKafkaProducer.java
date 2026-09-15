package com.threadspeak.quiz.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.quiz.event.QuizCompletedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class QuizKafkaProducer {

    private static final Logger log = LoggerFactory.getLogger(QuizKafkaProducer.class);
    public static final String TOPIC_QUIZ_COMPLETED = "threadspeak.quiz.completed";

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public QuizKafkaProducer(@Autowired(required = false) KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishQuizCompleted(QuizCompletedEvent event) {
        if (kafkaTemplate == null) {
            return;
        }

        CompletableFuture.runAsync(() -> {
            try {
                String payload = objectMapper.writeValueAsString(event);
                kafkaTemplate.send(TOPIC_QUIZ_COMPLETED, event.getUserId(), payload)
                        .whenComplete((result, ex) -> {
                            if (ex != null) {
                                log.debug("[Kafka-Quiz] Event publish skipped (Kafka broker offline): {}", ex.getMessage());
                            } else {
                                log.info("[Kafka-Quiz] Published quiz completion event for user: {} (XP: {})", event.getUserId(), event.getXpEarned());
                            }
                        });
            } catch (Exception e) {
                log.debug("[Kafka-Quiz] Serialization failure: {}", e.getMessage());
            }
        });
    }
}
