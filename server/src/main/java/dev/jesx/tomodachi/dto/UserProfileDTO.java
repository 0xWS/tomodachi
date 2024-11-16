package dev.jesx.tomodachi.dto;

import lombok.Data;

@Data
public class UserProfileDTO {
    private Long id;
    private String username;
    private String displayName;
    private String profilePictureBase64;

    public UserProfileDTO(Long id, String username, String displayName, byte[] profilePicture) {
        this.id = id;
        this.username = username;
        this.displayName = displayName;
        this.profilePictureBase64 = profilePicture != null ? 
            java.util.Base64.getEncoder().encodeToString(profilePicture) : null;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePictureBase64 = profilePicture != null ? 
            java.util.Base64.getEncoder().encodeToString(profilePicture) : null;
    }
}
