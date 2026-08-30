package com.threadspeak.repository;

import com.threadspeak.entity.TopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<TopicEntity, String> {
    List<TopicEntity> findByTrackId(String trackId);
    List<TopicEntity> findByCategory(String category);
}
