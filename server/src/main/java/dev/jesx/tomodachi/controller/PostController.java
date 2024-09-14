package dev.jesx.tomodachi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import dev.jesx.tomodachi.service.PostService;
import dev.jesx.tomodachi.model.Post;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/posts")
@Tag(name = "Posts", description = "Posts management APIs")
public class PostController {
    
    @Autowired
    private PostService postService;

    @GetMapping("/{username}")
    public ResponseEntity<List<Post>> getPostsByUserId(@PathVariable String username) {
        List<Post> posts = postService.getPostsByUsername(username);
        return ResponseEntity.ok(posts);
    }

    @PostMapping()
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getPrincipal().toString();

        Post savedPost = postService.createPost(post, username);

        return ResponseEntity.ok(savedPost);
    }
}
