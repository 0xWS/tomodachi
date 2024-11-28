package dev.jesx.tomodachi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.jesx.tomodachi.model.Post;
import dev.jesx.tomodachi.model.User;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserOrderByCreatedAtDesc(User user);

  @Query("""
        SELECT p
        FROM Post p
        JOIN p.user u
        WHERE u.id = :userId
        ORDER BY p.createdAt DESC
        """)
    Page<Post> findPostFeedByUsername(@Param("userId") Long userId, Pageable pageable);

    @Query("""
        SELECT p
        FROM Post p
        JOIN p.user u
        LEFT JOIN u.followers f
        WHERE f.follower.id = :currentUserId AND p.parentPost IS NULL
        OR p.user.id = :currentUserId
        ORDER BY p.createdAt DESC
        """)
    Page<Post> findPostFeedForUser(@Param("currentUserId") Long currentUserId, Pageable pageable);
}
