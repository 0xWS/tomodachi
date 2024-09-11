package dev.jesx.tomodachi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.jesx.tomodachi.model.Post;
import dev.jesx.tomodachi.model.User;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserOrderByCreatedAtDesc(User user);
}
