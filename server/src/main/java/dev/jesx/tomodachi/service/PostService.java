package dev.jesx.tomodachi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

import dev.jesx.tomodachi.repository.PostRepository;
import dev.jesx.tomodachi.repository.UserRepository;
import dev.jesx.tomodachi.model.Post;
import dev.jesx.tomodachi.model.User;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Post> getPostsByUserId(Long userId) {
        User user = userRepository.findById(userId)
            .get();
        return postRepository.findByUserOrderByCreatedAtDesc(user);
    }
}
