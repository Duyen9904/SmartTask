package com.dev.smarttask.auth.application.port.out;

import com.dev.smarttask.auth.domain.model.Jwt;
import com.dev.smarttask.auth.domain.model.Role;

import java.util.UUID;

/**
 * Output port for JWT operations.
 * Decoupled from User entity — accepts individual claims for generation.
 */
public interface TokenProviderPort {

    /**
     * Generate a full Jwt (access token) from individual claims.
     */
    Jwt generateJwt(UUID userId, String email, Role role);

    /**
     * Generate a raw token string from individual claims (convenience shorthand).
     */
    String generateToken(UUID userId, String email, Role role);

    /**
     * Generate a new access token from a validated refresh token's associated user data.
     * This is a convenience method used during the refresh flow.
     */
    String createTokenFromRefreshToken(UUID userId, String email, Role role);

    /**
     * Generate a random refresh token string (opaque, not a JWT).
     */
    String generateRefreshToken();

    /**
     * Parse and validate a JWT token string, returning a structured Jwt object.
     * Throws if the token is invalid or expired.
     */
    Jwt parseJwt(String token);

    /**
     * Validate a JWT token without throwing.
     */
    boolean validateToken(String token);

    /**
     * Return the configured access token expiration in milliseconds.
     */
    long getAccessTokenExpirationMs();
}
