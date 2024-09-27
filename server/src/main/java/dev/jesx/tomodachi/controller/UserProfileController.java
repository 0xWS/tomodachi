package dev.jesx.tomodachi.controller;

import dev.jesx.tomodachi.model.UserProfile;
import dev.jesx.tomodachi.service.UserProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import io.swagger.v3.oas.annotations.tags.Tag;


@RestController
@RequestMapping("/api/userProfile")
@Tag(name = "UserProfile", description = "UserProfile managment APIs")
public class UserProfileController {
    
    @Autowired
    private UserProfileService userProfileService;

    @GetMapping("/{username}")
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable String username) {
        UserProfile profile = userProfileService.getUserProfileByUsername(username);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/update")
    public ResponseEntity<UserProfile> updateUserProfile(@RequestBody ProfileUpdateRequest request) {
        UserProfile updatedProfile = userProfileService.updateUserProfile(
            request.getDisplayName(),
            request.getDescription()
        );
        return ResponseEntity.ok(updatedProfile);
    }
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class ProfileUpdateRequest {
    private String displayName;
    private String description;
}