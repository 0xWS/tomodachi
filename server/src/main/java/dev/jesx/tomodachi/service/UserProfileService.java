package dev.jesx.tomodachi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.model.UserProfile;
import dev.jesx.tomodachi.repository.UserProfileRepository;
import dev.jesx.tomodachi.repository.UserRepository;

@Service
public class UserProfileService {
   
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    public UserProfile getUserProfileByUsername(String username) {
        //TODO: Add error handling
        User user = userRepository.findByUsername(username).get();
        return userProfileRepository.findByUserId(user.getId());
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
