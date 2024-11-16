package dev.jesx.tomodachi.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PostFeedDTO {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private int likeCount;
    private boolean isLikedByCurrentUser;
    private UserProfileDTO author;

    public PostFeedDTO(
            Long id, 
            String content, 
            LocalDateTime createdAt, 
            int likeCount, 
            boolean isLikedByCurrentUser,
            Long userId,
            String username,
            String displayName,
            byte[] profilePicture) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
        this.likeCount = likeCount;
        this.isLikedByCurrentUser = isLikedByCurrentUser;
        this.author = new UserProfileDTO(userId, username, displayName, profilePicture);
    }
}