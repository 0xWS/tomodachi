package dev.jesx.tomodachi.service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.model.UserProfile;
import dev.jesx.tomodachi.repository.UserProfileRepository;
import dev.jesx.tomodachi.repository.UserRepository;
import dev.jesx.tomodachi.utils.CurrentUserUtil;
import dev.jesx.tomodachi.utils.ImageUtil;

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
    public UserProfile createUserProfile(User user) throws IOException {
        UserProfile profile = new UserProfile();
        profile.setUser(user);
        profile.setDisplayName(user.getUsername());
        profile.setDescription("Hello, i'm new here!");
        byte[] defaultProfilePicture = getDefaultPfp();
        byte[] resizedAndCompressedImage = ImageUtil.resizeAndCompressImage(defaultProfilePicture, 256, 256, 0.7f);
        profile.setProfilePicture(resizedAndCompressedImage);

        return userProfileRepository.save(profile);
    }

    @Transactional
    public UserProfile updateUserProfile(String displayName, String description, MultipartFile profilePicture) throws IOException {
        Long currentUserId = currentUserUtil.getCurrentUserId();
        UserProfile userProfile = userProfileRepository.findByUserId(currentUserId)
          .orElseThrow(() -> new RuntimeException("User profile not found"));
        
        if (displayName != null) {
            userProfile.setDisplayName(displayName);
        }

        if (description != null) {
            userProfile.setDescription(description);
        }

        if (profilePicture != null && !profilePicture.isEmpty()) {
            byte[] imageBytes = profilePicture.getBytes();
            byte[] resizedAndCompressedImage = ImageUtil.resizeAndCompressImage(imageBytes, 256, 256, 0.7f);
            userProfile.setProfilePicture(resizedAndCompressedImage);
        }

        return userProfileRepository.save(userProfile);
    }

    private byte[] getDefaultPfp() throws IOException {
        try (InputStream is = getClass().getResourceAsStream("./default-pfp.png")) {
            if (is == null) {
                throw new IOException("Default pfp not found");
            }
            return is.readAllBytes();
        }
    }
}
