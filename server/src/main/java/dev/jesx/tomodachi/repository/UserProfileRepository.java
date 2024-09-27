package dev.jesx.tomodachi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.jesx.tomodachi.model.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {
    Optional<UserProfile> findByUserId(Long userId);
}
