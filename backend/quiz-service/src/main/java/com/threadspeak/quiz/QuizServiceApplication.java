package com.threadspeak.quiz;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class QuizServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizServiceApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  ThreadSpeak Quiz Microservice on :8083         ");
        System.out.println("  Integrated with Feign -> user-service          ");
        System.out.println("=================================================");
    }
}
