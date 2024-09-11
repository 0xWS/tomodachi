package dev.jesx.tomodachi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.jesx.tomodachi.model.UserProfile;
import dev.jesx.tomodachi.service.UserProfileService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/userProfile")
@Tag(name = "UserProfile", description = "UserProfile managment APIs")
public class UserProfileController {
    
    @Autowired
    private UserProfileService userProfileService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable Long userId) {
        UserProfile profile = userProfileService.getUserProfile(userId);
        return ResponseEntity.ok(profile);
    }
}
