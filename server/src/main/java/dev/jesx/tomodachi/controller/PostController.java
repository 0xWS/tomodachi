package dev.jesx.tomodachi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;

import dev.jesx.tomodachi.dto.PostFeedDTO;
import dev.jesx.tomodachi.model.Post;
import dev.jesx.tomodachi.service.PostService;
import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/posts")
@Tag(name = "Posts", description = "Posts management APIs")
public class PostController {
    
    @Autowired
    private PostService postService;

    @GetMapping("/feed")
    public ResponseEntity<Page<PostFeedDTO>> getPostFeed(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        return ResponseEntity.ok(
            postService.getPostFeed(page, size)
        );
    }
    

    @GetMapping()
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Page<PostFeedDTO>> getPostsByUserId(
        @PathVariable String username,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        Page<PostFeedDTO> posts = postService.getPostsByUsername(username, page, size);
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
