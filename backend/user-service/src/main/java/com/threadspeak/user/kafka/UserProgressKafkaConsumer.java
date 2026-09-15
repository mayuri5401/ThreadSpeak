package com.threadspeak.user.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.user.event.QuizCompletedEvent;
import com.threadspeak.user.event.TopicCompletedEvent;
import com.threadspeak.user.service.UserProgressService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class UserProgressKafkaConsumer {

    private static final Logger log = LoggerFactory.getLogger(UserProgressKafkaConsumer.class);
    private final UserProgressService userProgressService;
    private final ObjectMapper objectMapper;

    public UserProgressKafkaConsumer(UserProgressService userProgressService, ObjectMapper objectMapper) {
        this.userProgressService = userProgressService;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "threadspeak.quiz.completed", groupId = "user-service-progress-group", autoStartup = "${spring.kafka.enabled:true}")
    public void consumeQuizCompleted(String message) {
        try {
            QuizCompletedEvent event = objectMapper.readValue(message, QuizCompletedEvent.class);
            log.info("[Kafka-User-Consumer] Consumed quiz completion event for user: {} (Topic: {}, Score: {}/{}, XP: {})",
                    event.getUserId(), event.getTopicOrTrackId(), event.getCorrectCount(), event.getTotalQuestions(), event.getXpEarned());

            userProgressService.recordQuizScore(
                    event.getUserId(),
                    event.getTopicOrTrackId(),
                    event.getCorrectCount(),
                    event.getXpEarned()
            );
        } catch (Exception e) {
            log.warn("[Kafka-User-Consumer] Could not process quiz message: {}", e.getMessage());
        }
    }

    @KafkaListener(topics = "threadspeak.topic.completed", groupId = "user-service-progress-group", autoStartup = "${spring.kafka.enabled:true}")
    public void consumeTopicCompleted(String message) {
        try {
            TopicCompletedEvent event = objectMapper.readValue(message, TopicCompletedEvent.class);
            log.info("[Kafka-User-Consumer] Consumed topic completed event for user: {} (Topic: {})",
                    event.getUserId(), event.getTopicId());

            userProgressService.completeTopic(event.getUserId(), event.getTopicId());
        } catch (Exception e) {
            log.warn("[Kafka-User-Consumer] Could not process topic completed message: {}", e.getMessage());
        }
    }
}
