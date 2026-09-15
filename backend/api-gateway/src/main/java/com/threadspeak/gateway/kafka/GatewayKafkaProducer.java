package com.threadspeak.gateway.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.gateway.event.GatewayAccessLogEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class GatewayKafkaProducer {

    private static final Logger log = LoggerFactory.getLogger(GatewayKafkaProducer.class);
    public static final String TOPIC_GATEWAY_ACCESS_LOGS = "threadspeak.gateway.access-logs";

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public GatewayKafkaProducer(@Autowired(required = false) KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void sendAccessLog(GatewayAccessLogEvent event) {
        if (kafkaTemplate == null) {
            return;
        }

        CompletableFuture.runAsync(() -> {
            try {
                String payload = objectMapper.writeValueAsString(event);
                kafkaTemplate.send(TOPIC_GATEWAY_ACCESS_LOGS, event.getCorrelationId(), payload)
                        .whenComplete((result, ex) -> {
                            if (ex != null) {
                                log.debug("[Kafka-Gateway] Access log dispatch skipped (Kafka broker offline): {}", ex.getMessage());
                            }
                        });
            } catch (Exception e) {
                log.debug("[Kafka-Gateway] Failed to serialize access log event: {}", e.getMessage());
            }
        });
    }
}
