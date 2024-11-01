package dev.jesx.tomodachi.controller;

import dev.jesx.tomodachi.dto.UserProfileUpdateDTO;
import dev.jesx.tomodachi.model.UserProfile;
import dev.jesx.tomodachi.service.UserProfileService;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PutMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateUserProfile(
        @RequestPart("data") UserProfileUpdateDTO request,
        @RequestPart(value = "profilePicture", required = false) MultipartFile profilePicture
    ) throws IOException {
        try {
            UserProfile updatedProfile = userProfileService.updateUserProfile(
                request.getDisplayName(),
                request.getDescription(),
                profilePicture
            );
            return ResponseEntity.ok(updatedProfile);
        } catch (Error e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}