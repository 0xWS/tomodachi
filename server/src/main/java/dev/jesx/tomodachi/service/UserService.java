package dev.jesx.tomodachi.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.jesx.tomodachi.exception.LoginException;
import dev.jesx.tomodachi.model.User;
import dev.jesx.tomodachi.model.UserProfile;
import dev.jesx.tomodachi.repository.UserProfileRepository;
import dev.jesx.tomodachi.repository.UserRepository;
import dev.jesx.tomodachi.utils.JwtUtil;
import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private CdKeyService cdKeyService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public User registerUser(User user, String cdKey) {
        if (cdKey == null || cdKey.isEmpty() || !cdKeyService.isValidKey(cdKey)) {
            throw new IllegalArgumentException("Invalid cd key");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        UserProfile userProfile = new UserProfile();
        userProfile.setUser(savedUser);
        userProfile.setDisplayName(savedUser.getUsername());
        userProfile.setDescription("Hello, i'm new here!");
        userProfile.setProfilePicture(null);
        userProfileRepository.save(userProfile);

        cdKeyService.useKey(cdKey, savedUser);

        return savedUser;
    }

    public String loginUser(String username, String password) throws LoginException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new LoginException("Invalid username or password"));

        if (password != null && passwordEncoder.matches(password, user.getPassword())) {
            return jwtUtil.generateToken(user);
        } else {
            throw new LoginException("Invalid credentials");
        }
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}