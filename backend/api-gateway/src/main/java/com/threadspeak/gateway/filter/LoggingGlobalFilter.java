package com.threadspeak.gateway.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class LoggingGlobalFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(LoggingGlobalFilter.class);
    private final com.threadspeak.gateway.kafka.GatewayKafkaProducer kafkaProducer;

    public LoggingGlobalFilter(com.threadspeak.gateway.kafka.GatewayKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        long startTime = System.currentTimeMillis();
        String path = exchange.getRequest().getURI().getPath();
        String method = exchange.getRequest().getMethod().name();
        String correlationId = exchange.getRequest().getHeaders().getFirst(CorrelationIdFilter.CORRELATION_ID_HEADER);
        String clientIp = exchange.getRequest().getRemoteAddress() != null
                ? exchange.getRequest().getRemoteAddress().getAddress().getHostAddress()
                : "unknown";

        log.info("[GATEWAY-REQUEST] [{}] {} {}", correlationId, method, path);

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            long duration = System.currentTimeMillis() - startTime;
            int statusCode = exchange.getResponse().getStatusCode() != null ? exchange.getResponse().getStatusCode().value() : 500;
            log.info("[GATEWAY-RESPONSE] [{}] {} {} -> Status: {} ({}ms)", correlationId, method, path, statusCode, duration);

            // Emit to Kafka Access Logs Topic asynchronously
            kafkaProducer.sendAccessLog(new com.threadspeak.gateway.event.GatewayAccessLogEvent(
                    correlationId, path, method, statusCode, duration, clientIp
            ));
        }));
    }

    @Override
    public int getOrder() {
        return -1; // Execute right after correlation filter
    }
}
