package dev.jesx.tomodachi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.jesx.tomodachi.dto.PostFeedDTO;
import dev.jesx.tomodachi.model.Post;
import dev.jesx.tomodachi.model.User;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserOrderByCreatedAtDesc(User user);

    @Query(
        "SELECT DISTINCT p FROM Post p " +
        "JOIN p.user u " +
        "JOIN u.followers f " +
        "LEFT JOIN u.userProfile up " +
        "WHERE f.follower.id = :currentUserId " +
        "ORDER BY p.createdAt DESC"
    )
    List<Post> findAllFromFollowedUsersWithUserAndProfile(@Param("currentUserId") Long currentUserId);

    @Query("""
        SELECT NEW dev.jesx.tomodachi.dto.PostFeedDTO(
            p.id,
            p.content,
            p.createdAt,
            p.likeCount,
            CASE WHEN pl.id IS NOT NULL THEN true ELSE false END,
            p.user.id,
            p.user.username,
            up.displayName,
            up.profilePicture
        )
        FROM Post p
        JOIN p.user u
        LEFT JOIN u.userProfile up
        LEFT JOIN p.likes pl
            ON pl.user.id = :currentUserId AND pl.post.id = p.id
        WHERE u.id = :userId
        ORDER BY p.createdAt DESC
        """)
    Page<PostFeedDTO> findUserPostFeed(@Param("userId") Long userId, @Param("currentUserId") Long currentUserId, Pageable pageable);

    @Query("""
        SELECT NEW dev.jesx.tomodachi.dto.PostFeedDTO(
            p.id,
            p.content,
            p.createdAt,
            p.likeCount,
            CASE WHEN pl.id IS NOT NULL THEN true ELSE false END,
            p.user.id,
            p.user.username,
            up.displayName,
            up.profilePicture
        )
        FROM Post p
        JOIN p.user u
        JOIN u.followers f
        LEFT JOIN u.userProfile up
        LEFT JOIN p.likes pl
            ON pl.user.id = :currentUserId AND pl.post.id = p.id
        WHERE f.follower.id = :currentUserId
        ORDER BY p.createdAt DESC
        """)
    Page<PostFeedDTO> findPostFeedForUser(@Param("currentUserId") Long currentUserId, Pageable pageable);
}
