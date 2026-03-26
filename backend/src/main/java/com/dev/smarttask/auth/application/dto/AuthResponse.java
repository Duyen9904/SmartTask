package com.dev.smarttask.auth.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.UUID;

@Getter
@Builder
@AllArgsConstructor
public class AuthResponse {

    private final String accessToken;
    private final String refreshToken;

    @Builder.Default
    private final String tokenType = "Bearer";

    private final long expiresIn;

    private final UserDTO user;

    @Getter
    @Builder
    @AllArgsConstructor
    public static class UserDTO {
        private final UUID id;
        private final String email;
        private final String fullName;
        private final String avatarUrl;
        private final String role;
    }
}
