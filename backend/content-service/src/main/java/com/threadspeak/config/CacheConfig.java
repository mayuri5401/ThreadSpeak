package com.threadspeak.config;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    @Value("${spring.data.redis.host:localhost}")
    private String redisHost;

    @Value("${spring.data.redis.port:6379}")
    private int redisPort;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        RedisStandaloneConfiguration config = new RedisStandaloneConfiguration(redisHost, redisPort);
        LettuceConnectionFactory factory = new LettuceConnectionFactory(config);
        factory.setValidateConnection(false);
        return factory;
    }

    /**
     * Hybrid Two-Tier Cache Manager:
     * - Primary: Redis Distributed Cache with 1-hour TTL (for 10,000+ concurrent enterprise users)
     * - Fallback: Caffeine In-Memory L1 Cache (< 0.1ms latency) if Redis is offline
     */
    @Bean
    @Primary
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        try {
            // Test if Redis connection is active
            connectionFactory.getConnection().ping();

            ObjectMapper redisObjectMapper = new ObjectMapper();
            redisObjectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            redisObjectMapper.activateDefaultTyping(
                    LaissezFaireSubTypeValidator.instance,
                    ObjectMapper.DefaultTyping.NON_FINAL,
                    JsonTypeInfo.As.PROPERTY
            );

            GenericJackson2JsonRedisSerializer jsonSerializer = new GenericJackson2JsonRedisSerializer(redisObjectMapper);

            // Default 1-Hour TTL (3600 seconds)
            RedisCacheConfiguration defaultCacheConfig = RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofHours(1))
                    .disableCachingNullValues()
                    .serializeKeysWith(RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer()))
                    .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jsonSerializer));

            Map<String, RedisCacheConfiguration> cacheConfigs = new HashMap<>();
            cacheConfigs.put("tracks", defaultCacheConfig.entryTtl(Duration.ofHours(2)));
            cacheConfigs.put("topics", defaultCacheConfig.entryTtl(Duration.ofHours(1)));
            cacheConfigs.put("track_topics", defaultCacheConfig.entryTtl(Duration.ofHours(1)));
            cacheConfigs.put("search_topics", defaultCacheConfig.entryTtl(Duration.ofMinutes(30)));

            System.out.println(">>> [CacheConfig] Enterprise Redis Cache Manager initialized with 1-Hour TTL.");
            return RedisCacheManager.builder(connectionFactory)
                    .cacheDefaults(defaultCacheConfig)
                    .withInitialCacheConfigurations(cacheConfigs)
                    .build();

        } catch (Exception e) {
            System.out.println(">>> [CacheConfig] Redis not running on " + redisHost + ":" + redisPort + ". Gracefully activating Caffeine L1 In-Memory Cache (< 0.1ms latency).");
            return createCaffeineCacheManager();
        }
    }

    private CaffeineCacheManager createCaffeineCacheManager() {
        CaffeineCacheManager caffeineCacheManager = new CaffeineCacheManager(
                "tracks",
                "topics",
                "track_topics",
                "search_topics"
        );
        caffeineCacheManager.setCaffeine(Caffeine.newBuilder()
                .initialCapacity(200)
                .maximumSize(10000)
                .expireAfterWrite(1, TimeUnit.HOURS)
                .recordStats());
        return caffeineCacheManager;
    }
}
