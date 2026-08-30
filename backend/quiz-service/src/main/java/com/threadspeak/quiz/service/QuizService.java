package com.threadspeak.quiz.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.threadspeak.quiz.client.UserProgressClient;
import com.threadspeak.quiz.entity.QuizQuestionEntity;
import com.threadspeak.quiz.model.QuizQuestion;
import com.threadspeak.quiz.repository.QuizQuestionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizQuestionRepository quizQuestionRepository;
    private final UserProgressClient userProgressClient;
    private final ObjectMapper mapper;

    // Fast in-memory cache synchronized with PostgreSQL
    private final Map<String, QuizQuestion> questionsMap = new ConcurrentHashMap<>();

    public QuizService(QuizQuestionRepository quizQuestionRepository, UserProgressClient userProgressClient) {
        this.quizQuestionRepository = quizQuestionRepository;
        this.userProgressClient = userProgressClient;
        this.mapper = new ObjectMapper();
        this.mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @PostConstruct
    public void initQuizzes() {
        loadQuestionsFromJson();

        // Async PostgreSQL synchronization
        CompletableFuture.runAsync(this::syncToDatabase);
    }

    public synchronized void loadQuestionsFromJson() {
        questionsMap.clear();
        try (InputStream is = getClass().getResourceAsStream("/data/quiz_questions.json")) {
            if (is != null) {
                List<QuizQuestion> list = mapper.readValue(is, new TypeReference<List<QuizQuestion>>() {});
                for (QuizQuestion q : list) {
                    questionsMap.put(q.getId(), q);
                }
                System.out.println(">>> [QuizService] Loaded " + questionsMap.size() + " quiz questions from JSON seed into memory.");
            }
        } catch (Exception e) {
            System.err.println("Error reading quiz_questions.json: " + e.getMessage());
        }
    }

    public void syncToDatabase() {
        try {
            if (quizQuestionRepository.count() < questionsMap.size()) {
                List<QuizQuestionEntity> entities = questionsMap.values().stream()
                        .map(QuizQuestionEntity::fromModel)
                        .collect(Collectors.toList());
                quizQuestionRepository.saveAll(entities);
                System.out.println(">>> [QuizService] Synced " + entities.size() + " quiz questions to database.");
            }
        } catch (Exception e) {
            System.out.println("Async quiz DB sync completed/skipped: " + e.getMessage());
        }
    }

    // ==========================================
    // READ OPERATIONS
    // ==========================================

    public List<QuizQuestion> getAllQuestions() {
        try {
            List<QuizQuestionEntity> entities = quizQuestionRepository.findAll();
            if (!entities.isEmpty()) {
                return entities.stream().map(QuizQuestionEntity::toModel).collect(Collectors.toList());
            }
        } catch (Exception ignored) {}
        return new ArrayList<>(questionsMap.values());
    }

    public List<QuizQuestion> getQuestionsByTrack(String trackId) {
        try {
            List<QuizQuestionEntity> entities = quizQuestionRepository.findByTrackId(trackId);
            if (!entities.isEmpty()) {
                return entities.stream().map(QuizQuestionEntity::toModel).collect(Collectors.toList());
            }
        } catch (Exception ignored) {}
        return questionsMap.values().stream()
                .filter(q -> trackId.equalsIgnoreCase(q.getTrackId()))
                .collect(Collectors.toList());
    }

    public List<QuizQuestion> getQuestionsByTopic(String topicId) {
        try {
            List<QuizQuestionEntity> entities = quizQuestionRepository.findByTopicId(topicId);
            if (!entities.isEmpty()) {
                return entities.stream().map(QuizQuestionEntity::toModel).collect(Collectors.toList());
            }
        } catch (Exception ignored) {}
        return questionsMap.values().stream()
                .filter(q -> topicId.equalsIgnoreCase(q.getTopicId()))
                .collect(Collectors.toList());
    }

    public QuizQuestion getQuestionById(String id) {
        try {
            Optional<QuizQuestionEntity> opt = quizQuestionRepository.findById(id);
            if (opt.isPresent()) return opt.get().toModel();
        } catch (Exception ignored) {}
        return questionsMap.get(id);
    }

    // ==========================================
    // EVALUATION & DYNAMIC CRUD
    // ==========================================

    public Map<String, Object> evaluateQuiz(Map<String, Integer> userAnswers, String userId, String topicOrTrackId) {
        int totalQuestions = userAnswers != null ? userAnswers.size() : 0;
        int correctCount = 0;
        int totalXp = 0;
        Map<String, Object> results = new HashMap<>();

        if (userAnswers != null) {
            for (Map.Entry<String, Integer> entry : userAnswers.entrySet()) {
                String questionId = entry.getKey();
                int selectedIndex = entry.getValue();
                QuizQuestion q = getQuestionById(questionId);
                if (q != null) {
                    boolean isCorrect = (q.getCorrectOptionIndex() == selectedIndex);
                    if (isCorrect) {
                        correctCount++;
                        totalXp += 10;
                    }
                    results.put(questionId, Map.of(
                            "isCorrect", isCorrect,
                            "correctOptionIndex", q.getCorrectOptionIndex(),
                            "explanation", q.getExplanation()
                    ));
                }
            }
        }

        if (userId != null && !userId.isBlank() && totalXp > 0) {
            try {
                userProgressClient.recordQuizScore(userId, topicOrTrackId != null ? topicOrTrackId : "quiz", correctCount, totalXp);
            } catch (Exception e) {
                System.out.println("Could not sync total XP: " + e.getMessage());
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("totalQuestions", totalQuestions);
        response.put("correctCount", correctCount);
        response.put("xpEarned", totalXp);
        response.put("results", results);
        return response;
    }

    public Map<String, Object> evaluateAnswer(String questionId, int selectedOptionIndex, String userId) {
        QuizQuestion question = getQuestionById(questionId);
        if (question == null) {
            return Map.of("error", "Question not found: " + questionId);
        }

        boolean isCorrect = (question.getCorrectOptionIndex() == selectedOptionIndex);
        int xpEarned = isCorrect ? 10 : 0;

        if (userId != null && !userId.isBlank() && isCorrect) {
            try {
                userProgressClient.recordQuizScore(userId, question.getTopicId() != null ? question.getTopicId() : "quiz", 1, xpEarned);
            } catch (Exception e) {
                System.out.println("Could not sync XP with user-service: " + e.getMessage());
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("questionId", questionId);
        response.put("isCorrect", isCorrect);
        response.put("correctOptionIndex", question.getCorrectOptionIndex());
        response.put("explanation", question.getExplanation());
        response.put("xpEarned", xpEarned);
        return response;
    }

    public QuizQuestion saveQuestion(QuizQuestion question) {
        if (question == null || question.getId() == null) {
            throw new IllegalArgumentException("Question and ID must not be null");
        }
        questionsMap.put(question.getId(), question);
        try {
            quizQuestionRepository.save(QuizQuestionEntity.fromModel(question));
        } catch (Exception e) {
            System.err.println("Could not persist quiz question: " + e.getMessage());
        }
        return question;
    }

    public boolean deleteQuestion(String id) {
        boolean removed = questionsMap.remove(id) != null;
        try {
            if (quizQuestionRepository.existsById(id)) {
                quizQuestionRepository.deleteById(id);
                removed = true;
            }
        } catch (Exception ignored) {}
        return removed;
    }
}
