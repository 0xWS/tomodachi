package dev.jesx.tomodachi.repository;

import java.util.Optional;

import dev.jesx.tomodachi.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    User findByEmail(String email);
}
