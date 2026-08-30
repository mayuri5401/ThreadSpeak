package com.threadspeak;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class CodeRunnerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CodeRunnerServiceApplication.class, args);
        System.out.println("=================================================");
        System.out.println("  ThreadSpeak Code Runner Service on :8084       ");
        System.out.println("=================================================");
    }
}
