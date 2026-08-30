package com.threadspeak.quiz.controller;

import com.threadspeak.quiz.model.QuizQuestion;
import com.threadspeak.quiz.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping
    public ResponseEntity<List<QuizQuestion>> getAllQuizzes() {
        return ResponseEntity.ok(quizService.getAllQuestions());
    }

    @GetMapping("/track/{trackId}")
    public ResponseEntity<List<QuizQuestion>> getQuizzesByTrack(@PathVariable String trackId) {
        return ResponseEntity.ok(quizService.getQuestionsByTrack(trackId));
    }

    @GetMapping("/topic/{topicId}")
    public ResponseEntity<List<QuizQuestion>> getQuizzesByTopic(@PathVariable String topicId) {
        return ResponseEntity.ok(quizService.getQuestionsByTopic(topicId));
    }

    @PostMapping("/evaluate")
    public ResponseEntity<Map<String, Object>> evaluateQuiz(
            @RequestBody Map<String, Integer> userAnswers,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) String topicOrTrackId) {
        return ResponseEntity.ok(quizService.evaluateQuiz(userAnswers, userId, topicOrTrackId));
    }

    @PostMapping
    public ResponseEntity<QuizQuestion> createQuestion(@RequestBody QuizQuestion question) {
        return ResponseEntity.ok(quizService.saveQuestion(question));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteQuestion(@PathVariable String id) {
        boolean deleted = quizService.deleteQuestion(id);
        return ResponseEntity.ok(Map.of("id", id, "deleted", deleted));
    }
}
