package dev.jesx.tomodachi.dto;

import dev.jesx.tomodachi.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
    private User user;
    private String cdKey;
}
