package com.dev.smarttask.auth.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a refresh token.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    private UUID id;
    private String token;
    private UUID userId;
    private LocalDateTime expiryDate;

    @Builder.Default
    private boolean revoked = false;

    private LocalDateTime createdAt;

    public boolean isExpired() {
        return expiryDate.isBefore(LocalDateTime.now());
    }

    public boolean isValid() {
        return !revoked && !isExpired();
    }
}
