package dev.jesx.tomodachi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.jesx.tomodachi.model.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    UserProfile findByUserId(Long userId);
}
