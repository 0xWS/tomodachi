package dev.jesx.tomodachi.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.model.UserFollow;
import dev.jesx.tomodachi.repository.UserFollowRepository;
import dev.jesx.tomodachi.repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class UserFollowService {
    
    @Autowired
    private UserFollowRepository userFollowRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void followUser(Long followerId, Long followeeId) {
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("Follower not found"));
        User followee = userRepository.findById(followeeId)
                .orElseThrow(() -> new RuntimeException("Followee not found"));

        if (!userFollowRepository.existsByFollowerAndFollowee(follower, followee)) {
            UserFollow userFollow = new UserFollow();
            userFollow.setFollower(follower);
            userFollow.setFollowee(followee);
            userFollowRepository.save(userFollow);
        }
    }

    @Transactional
    public void unfollowUser(Long followerId, Long followeeId) {
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("Follower not found"));
        User followee = userRepository.findById(followeeId)
                .orElseThrow(() -> new RuntimeException("Followee not found"));

        userFollowRepository.findByFollowerAndFollowee(follower, followee)
                .ifPresent(userFollowRepository::delete);
    }

    public boolean isFollowing(Long followerId, Long followeeId) {
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new RuntimeException("Follower not found"));
        User followee = userRepository.findById(followeeId)
                .orElseThrow(() -> new RuntimeException("Followee not found"));

        return userFollowRepository.existsByFollowerAndFollowee(follower, followee);
    }

    public List<User> getFollowers(Long userId) {
        return userFollowRepository.findByFolloweeId(userId)
            .stream()
            .map(UserFollow::getFollower)
            .collect(Collectors.toList());
    }

    public List<User> getFollowing(Long userId) {
        return userFollowRepository.findByFollowerId(userId)
            .stream()
            .map(UserFollow::getFollower)
            .collect(Collectors.toList());
    }
}
