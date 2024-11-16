package dev.jesx.tomodachi.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserProfileDetailsDTO extends UserProfileDTO {
    private String description;
    private int followerCount;
    private int followingCount;
    private boolean isFollowed;

    public UserProfileDetailsDTO(
        Long id, String username, String displayName, byte[] profilePicture,
        String description, int followerCount, int followingCount, boolean isFollowed
    ) {
        super(id, username, displayName, profilePicture);
        this.description = description;
        this.followerCount = followerCount;
        this.followingCount = followingCount;
        this.isFollowed = isFollowed;
    }
}
