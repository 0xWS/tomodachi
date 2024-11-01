package dev.jesx.tomodachi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.jesx.tomodachi.service.PostLikeService;
import dev.jesx.tomodachi.service.UserService;
import dev.jesx.tomodachi.dto.UserDTO;
import io.swagger.v3.oas.annotations.tags.Tag;

import java.util.List;

@RestController
@RequestMapping("/api/post-like")
@Tag(name = "Post Likes")
public class PostLikeController {
    
    @Autowired
    private PostLikeService postLikeService;

    @Autowired
    private UserService userService;

    @PostMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable Long postId) {
        Long userId = getCurrentUserId();
        postLikeService.likePost(postId, userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/unlike")
    public ResponseEntity<?> unlikePost(@PathVariable Long postId) {
        Long userId = getCurrentUserId();
        postLikeService.unlikePost(postId, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{postId}/hasLiked")
    public ResponseEntity<Boolean> hasUserLikedPost(@PathVariable Long postId) {
        Long userId = getCurrentUserId();
        Boolean liked = postLikeService.hasUserLikedPost(postId, userId);

        return ResponseEntity.ok(liked);
    }

    @GetMapping("/{postId}/likers")
    public ResponseEntity<List<UserDTO>> getPostLikers(@PathVariable Long postId) {
        List<UserDTO> likers = postLikeService.getLikers(postId);

        return ResponseEntity.ok(likers);
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getPrincipal().toString();
        return userService.getUserByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"))
            .getId();
    }
}
