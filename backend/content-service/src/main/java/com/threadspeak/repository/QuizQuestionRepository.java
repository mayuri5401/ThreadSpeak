package com.threadspeak.repository;

import com.threadspeak.entity.QuizQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizQuestionRepository extends JpaRepository<QuizQuestionEntity, String> {
    List<QuizQuestionEntity> findByTrackId(String trackId);
    List<QuizQuestionEntity> findByTopicId(String topicId);
}
