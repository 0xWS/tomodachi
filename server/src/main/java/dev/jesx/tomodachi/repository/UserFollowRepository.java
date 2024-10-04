package dev.jesx.tomodachi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.model.UserFollow;
import java.util.List;


public interface UserFollowRepository extends JpaRepository<UserFollow, Long> {
    Optional<UserFollow> findByFollowerAndFollowee(User follower, User followee);
    Boolean existsByFollowerAndFollowee(User follower, User followee);
    List<UserFollow> findByFolloweeId(Long followeeId);
    List<UserFollow> findByFollowerId(Long followerId);
}