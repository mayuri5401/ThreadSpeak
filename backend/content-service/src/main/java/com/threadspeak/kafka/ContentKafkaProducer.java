package com.threadspeak.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.event.ContentEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class ContentKafkaProducer {

    private static final Logger log = LoggerFactory.getLogger(ContentKafkaProducer.class);
    public static final String TOPIC_CONTENT_EVENTS = "threadspeak.content.events";

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public ContentKafkaProducer(@Autowired(required = false) KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishContentEvent(ContentEvent event) {
        if (kafkaTemplate == null) return;

        CompletableFuture.runAsync(() -> {
            try {
                String payload = objectMapper.writeValueAsString(event);
                String key = event.getTopicId() != null ? event.getTopicId() : event.getEventType().name();
                kafkaTemplate.send(TOPIC_CONTENT_EVENTS, key, payload)
                        .whenComplete((result, ex) -> {
                            if (ex != null) {
                                log.debug("[Kafka-Content] Event skipped (Kafka offline): {}", ex.getMessage());
                            } else {
                                log.info("[Kafka-Content] Published content event: type={}, topicId={}", event.getEventType(), event.getTopicId());
                            }
                        });
            } catch (Exception e) {
                log.debug("[Kafka-Content] Serialization failure: {}", e.getMessage());
            }
        });
    }
}
