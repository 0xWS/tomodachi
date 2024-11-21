package dev.jesx.tomodachi.service;

import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.jesx.tomodachi.dto.PostFeedDTO;
import dev.jesx.tomodachi.model.Post;
import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.repository.PostRepository;
import dev.jesx.tomodachi.repository.UserRepository;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<Post> getPostFeed(int page, int size) {
        Long userId = getCurrentUserId();
        return postRepository.findPostFeedForUser(userId, PageRequest.of(page, size));
    }

    @Transactional(readOnly = true)
    public Page<Post> getPostsByUsername(String username, int page, int size) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        return postRepository.findPostFeedByUsername(user.getId(), PageRequest.of(page, size));
    }

    public Post createPost(Post post, String username) {
        //TODO: Add error handling
        User user = userRepository.findByUsername(username).get();
        post.setUser(user);

        return postRepository.save(post);
    }

    //Move to helper class
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getPrincipal().toString();
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"))
            .getId();
    }
}
