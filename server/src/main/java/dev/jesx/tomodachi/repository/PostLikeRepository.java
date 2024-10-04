package dev.jesx.tomodachi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.jesx.tomodachi.model.Post;
import dev.jesx.tomodachi.model.PostLike;
import dev.jesx.tomodachi.model.User;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Boolean existsByUserAndPost(User user, Post post);
    void deleteByUserAndPost(User user, Post post);
}
