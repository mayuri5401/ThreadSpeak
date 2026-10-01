package com.threadspeak.user.controller;

import com.threadspeak.user.entity.UserEntity;
import com.threadspeak.user.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    @Transactional
    public void seedInitialUsersIfEmpty() {
        if (userRepository.count() == 0) {
            userRepository.save(new UserEntity(
                "usr-mayuri-lead",
                "mayuri@threadspeak.dev",
                "Mayuri123!",
                "Mayuri",
                "Senior Software Engineer / System Architect",
                "FAANG / Tier-1 Enterprise",
                "Staff / Lead (8+ yrs)",
                "",
                3450,
                7,
                "August 2026"
            ));

            userRepository.save(new UserEntity(
                "usr-alex-architect",
                "alex@systems.dev",
                "AlexDev2026!",
                "Alex Rivera",
                "Principal Distributed Systems Engineer",
                "Netflix / Uber Core Infrastructure",
                "Principal / Architect (10+ yrs)",
                "",
                8920,
                24,
                "January 2026"
            ));

            userRepository.save(new UserEntity(
                "usr-rohan-student",
                "rohan@student.dev",
                "RohanLearns!",
                "Rohan Verma",
                "Junior Backend Engineer & DSA Aspirant",
                "Amazon SDE-1 / Atlassian",
                "Fresher / Student (0-1 yrs)",
                "",
                1200,
                3,
                "September 2026"
            ));
        }
    }

    @PostMapping("/login")
    @Transactional(readOnly = true)
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required."));
        }

        Optional<UserEntity> userOpt = userRepository.findByEmailIgnoreCase(email.trim());
        if (userOpt.isEmpty() || !password.equals(userOpt.get().getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password."));
        }

        UserEntity user = userOpt.get();
        Map<String, Object> response = toSafeUserMap(user);
        response.put("token", "jwt_token_" + UUID.randomUUID());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> register(@RequestBody Map<String, Object> payload) {
        String email = (String) payload.get("email");
        String password = (String) payload.get("password");
        String name = (String) payload.get("name");

        if (email == null || email.trim().isEmpty() || password == null || name == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Name, email, and password are required."));
        }

        String normalizedEmail = email.toLowerCase().trim();
        if (userRepository.existsByEmailIgnoreCase(normalizedEmail)) {
            return ResponseEntity.status(409).body(Map.of("message", "An account with this email already exists."));
        }

        UserEntity newUser = new UserEntity(
            "usr-" + UUID.randomUUID().toString().substring(0, 8),
            normalizedEmail,
            password,
            name.trim(),
            (String) payload.getOrDefault("role", "Software Engineer"),
            (String) payload.getOrDefault("targetCompany", "Tier-1 Tech"),
            (String) payload.getOrDefault("experienceLevel", "Mid-Level"),
            (String) payload.getOrDefault("avatarUrl", ""),
            100,
            1,
            "September 2026"
        );

        UserEntity saved = userRepository.save(newUser);

        Map<String, Object> response = toSafeUserMap(saved);
        response.put("token", "jwt_token_" + UUID.randomUUID());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/demo-accounts")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getDemoAccounts() {
        List<UserEntity> all = userRepository.findAll();
        List<Map<String, Object>> demos = new ArrayList<>();
        for (UserEntity u : all) {
            demos.add(toSafeUserMap(u));
        }
        return ResponseEntity.ok(demos);
    }

    @GetMapping("/users")
    @Transactional(readOnly = true)
    public ResponseEntity<?> getAllUsers() {
        List<UserEntity> all = userRepository.findAll();
        List<Map<String, Object>> users = new ArrayList<>();
        for (UserEntity u : all) {
            users.add(toSafeUserMap(u));
        }
        return ResponseEntity.ok(users);
    }

    private Map<String, Object> toSafeUserMap(UserEntity user) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", user.getId());
        map.put("email", user.getEmail());
        map.put("name", user.getName());
        map.put("role", user.getRole());
        map.put("targetCompany", user.getTargetCompany());
        map.put("experienceLevel", user.getExperienceLevel());
        map.put("avatarUrl", user.getAvatarUrl());
        map.put("xp", user.getXp());
        map.put("streak", user.getStreak());
        map.put("joinedDate", user.getJoinedDate());
        map.put("createdAt", user.getCreatedAt());
        return map;
    }
}
