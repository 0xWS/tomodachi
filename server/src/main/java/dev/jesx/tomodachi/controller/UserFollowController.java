package dev.jesx.tomodachi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.service.UserFollowService;
import dev.jesx.tomodachi.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/follows")
@Tag(name = "User Follows", description = "User follows management APIs")
public class UserFollowController {
    
    @Autowired
    private UserFollowService userFollowService;

    @Autowired
    private UserService userService;

    @PostMapping("/follow/{followeeId}")
    public ResponseEntity<?> followUser(@PathVariable Long followeeId) {
        Long userId = getCurrentUserId();
        userFollowService.followUser(userId, followeeId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/unfollow/{followeeId}")
    public ResponseEntity<?> unfollowUser(@PathVariable Long followeeId) {
        Long userId = getCurrentUserId();
        userFollowService.unfollowUser(userId, followeeId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<User>> getFollowersOfUser(@PathVariable Long userId) {
        List<User> followers = userFollowService.getFollowers(userId);
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/follows/{userId}")
    public ResponseEntity<List<User>> getFollowsOfUser(@PathVariable Long userId) {
        List<User> following = userFollowService.getFollows(userId);
        return ResponseEntity.ok(following);
    }

    @GetMapping("/isFollowed/{userId}")
    public ResponseEntity<Boolean> isFollowed(@PathVariable Long userId) {
        Long followerId = getCurrentUserId();
        Boolean isFollowed = userFollowService.isFollowing(followerId, userId);
        return ResponseEntity.ok(isFollowed);
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getPrincipal().toString();
        return userService.getUserByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"))
            .getId();
    }
    
}
