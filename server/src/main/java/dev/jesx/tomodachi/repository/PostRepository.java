package dev.jesx.tomodachi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import dev.jesx.tomodachi.model.Post;
import dev.jesx.tomodachi.model.User;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserOrderByCreatedAtDesc(User user);

    @Query("SELECT p from Post p JOIN FETCH p.user u LEFT JOIN FETCH u.userProfile ORDER BY p.createdAt DESC")
    List<Post> findAllWithUserAndProfile();
}
