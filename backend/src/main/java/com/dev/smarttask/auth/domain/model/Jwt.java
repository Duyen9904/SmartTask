package com.dev.smarttask.auth.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

/**
 * Domain value object representing a parsed/generated JWT.
 * Decoupled from any framework — pure Java.
 */
@Getter
@Builder
@AllArgsConstructor
public class Jwt {

    private final String token;
    private final UUID userId;
    private final String email;
    private final Role role;
    private final Instant issuedAt;
    private final Instant expiresAt;
}
