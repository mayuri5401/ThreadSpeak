package com.threadspeak.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.event.CodeExecutionTelemetryEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class CodeRunnerKafkaProducer {

    private static final Logger log = LoggerFactory.getLogger(CodeRunnerKafkaProducer.class);
    public static final String TOPIC_CODE_TELEMETRY = "threadspeak.code.telemetry";

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;

    public CodeRunnerKafkaProducer(@Autowired(required = false) KafkaTemplate<String, String> kafkaTemplate, ObjectMapper objectMapper) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = objectMapper;
    }

    public void publishExecutionTelemetry(CodeExecutionTelemetryEvent event) {
        if (kafkaTemplate == null) return;

        CompletableFuture.runAsync(() -> {
            try {
                String payload = objectMapper.writeValueAsString(event);
                String key = event.getTopicId() != null ? event.getTopicId() : "code-runner";
                kafkaTemplate.send(TOPIC_CODE_TELEMETRY, key, payload)
                        .whenComplete((result, ex) -> {
                            if (ex != null) {
                                log.debug("[Kafka-CodeRunner] Telemetry dispatch skipped (Kafka offline): {}", ex.getMessage());
                            } else {
                                log.info("[Kafka-CodeRunner] Published code execution telemetry: topic={}, success={}, duration={}ms",
                                        event.getTopicId(), event.isSuccess(), event.getExecutionDurationMs());
                            }
                        });
            } catch (Exception e) {
                log.debug("[Kafka-CodeRunner] Serialization failure: {}", e.getMessage());
            }
        });
    }
}
