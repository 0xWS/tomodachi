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

    public List<Post> getPostsByUsername(String username) {
        //TODO: Add error handling
        User user = userRepository.findByUsername(username).get();
        return postRepository.findByUserOrderByCreatedAtDesc(user);
    }
}
