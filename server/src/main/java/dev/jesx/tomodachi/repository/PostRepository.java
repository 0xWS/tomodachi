package dev.jesx.tomodachi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
}
