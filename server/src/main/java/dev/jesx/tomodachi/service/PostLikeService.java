package dev.jesx.tomodachi.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.jesx.tomodachi.dto.UserDTO;
import dev.jesx.tomodachi.model.Post;
import dev.jesx.tomodachi.model.PostLike;
import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.repository.PostLikeRepository;
import dev.jesx.tomodachi.repository.PostRepository;
import dev.jesx.tomodachi.repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class PostLikeService {

    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private PostLikeRepository postLikeRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void likePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    
        if (!postLikeRepository.existsByUserAndPost(user, post)) {
            PostLike like = new PostLike();
            like.setUser(user);
            like.setPost(post);
            postLikeRepository.save(like);
        
            post.incrementLikeCount();
            postRepository.save(post);
        }
    }
    
    @Transactional
    public void unlikePost(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    
        if (postLikeRepository.existsByUserAndPost(user, post)) {
            postLikeRepository.deleteByUserAndPost(user, post);
        
            post.decrementLikeCount();
            postRepository.save(post);
        }
    }

    public Boolean hasUserLikedPost(Long postId, Long userId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        return postLikeRepository.existsByUserAndPost(user, post);
    }
    
    public List<UserDTO> getLikers(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        return post.getLikes().stream()
          .map(PostLike::getUser)
          .map(this::convertToDTO)
          .collect(Collectors.toList());
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getUsername(),
            user.getUserProfile() != null? user.getUserProfile().getDisplayName() : null
        );
    }
}
