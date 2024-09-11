package dev.jesx.tomodachi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.model.UserProfile;
import dev.jesx.tomodachi.repository.UserProfileRepository;

@Service
public class UserProfileService {
   
    @Autowired
    private UserProfileRepository userProfileRepository;

    public UserProfile getUserProfile(Long userId) {
        return userProfileRepository.findByUserId(userId);
            //.orElseThrow(() -> new RuntimeException("Profile not found for user id: " + userId));
    }

    @Transactional
    public UserProfile createUserProfile(User user) {
        UserProfile profile = new UserProfile();
        profile.setUser(user);
        profile.setDisplayName(user.getUsername());
        profile.setDescription("Hello, i'm new here!");
        profile.setProfilePicture(null);

        return userProfileRepository.save(profile);
    }
}
