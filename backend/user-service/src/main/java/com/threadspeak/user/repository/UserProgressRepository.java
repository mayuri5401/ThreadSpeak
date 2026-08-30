package com.threadspeak.user.repository;

import com.threadspeak.user.entity.UserProgressEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgressEntity, String> {
}
