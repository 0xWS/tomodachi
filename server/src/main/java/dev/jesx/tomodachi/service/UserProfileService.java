package dev.jesx.tomodachi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.model.UserProfile;
import dev.jesx.tomodachi.repository.UserProfileRepository;
import dev.jesx.tomodachi.repository.UserRepository;
import dev.jesx.tomodachi.utils.CurrentUserUtil;

@Service
public class UserProfileService {
   
    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CurrentUserUtil currentUserUtil;


    public UserProfile getUserProfileByUsername(String username) {
        User user = userRepository.findByUsername(username).get();
        return userProfileRepository.findByUserId(user.getId())
            .orElseThrow(() -> new RuntimeException("UserProfile not found"));
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

    @Transactional
    public UserProfile updateUserProfile(String displayName, String description) {
        Long currentUserId = currentUserUtil.getCurrentUserId();
        UserProfile userProfile = userProfileRepository.findByUserId(currentUserId)
          .orElseThrow(() -> new RuntimeException("User profile not found"));

        userProfile.setDisplayName(displayName);
        userProfile.setDescription(description);

        return userProfileRepository.save(userProfile);
    }


}
