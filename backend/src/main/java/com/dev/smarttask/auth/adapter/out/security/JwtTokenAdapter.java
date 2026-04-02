package com.dev.smarttask.auth.adapter.out.security;

import com.dev.smarttask.auth.application.port.out.TokenProviderPort;
import com.dev.smarttask.auth.domain.model.Jwt;
import com.dev.smarttask.auth.domain.model.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Component
public class JwtTokenAdapter implements TokenProviderPort {

    private final SecretKey key;
    private final long accessTokenExpirationMs;
    private final long refreshTokenExpirationMs;

    public JwtTokenAdapter(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.access-token-expiration-ms}") long accessTokenExpirationMs,
            @Value("${app.jwt.refresh-token-expiration-ms}") long refreshTokenExpirationMs) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(
                java.util.Base64.getEncoder().encodeToString(secret.getBytes())));
        this.accessTokenExpirationMs = accessTokenExpirationMs;
        this.refreshTokenExpirationMs = refreshTokenExpirationMs;
    }

    @Override
    public Jwt generateJwt(UUID userId, String email, Role role) {
        Instant now = Instant.now();
        Instant expiry = now.plusMillis(accessTokenExpirationMs);

        String token = buildToken(userId, email, role, now, expiry);

        return Jwt.builder()
                .token(token)
                .userId(userId)
                .email(email)
                .role(role)
                .issuedAt(now)
                .expiresAt(expiry)
                .build();
    }

    @Override
    public String generateToken(UUID userId, String email, Role role) {
        return generateJwt(userId, email, role).getToken();
    }

    @Override
    public String createTokenFromRefreshToken(UUID userId, String email, Role role) {
        // Same logic as generateToken — generates a fresh access token
        return generateToken(userId, email, role);
    }

    @Override
    public String generateRefreshToken() {
        return UUID.randomUUID().toString();
    }

    @Override
    public Jwt parseJwt(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        String roleStr = claims.get("role", String.class);
        Role role = roleStr != null ? Role.valueOf(roleStr) : Role.USER;

        return Jwt.builder()
                .token(token)
                .userId(UUID.fromString(claims.getSubject()))
                .email(claims.get("email", String.class))
                .role(role)
                .issuedAt(claims.getIssuedAt().toInstant())
                .expiresAt(claims.getExpiration().toInstant())
                .build();
    }

    @Override
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    @Override
    public long getAccessTokenExpirationMs() {
        return accessTokenExpirationMs;
    }

    // ── Private helpers ──

    private String buildToken(UUID userId, String email, Role role, Instant now, Instant expiry) {
        return Jwts.builder()
                .subject(userId.toString())
                .claim("email", email)
                .claim("role", role.name())
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(key)
                .compact();
    }
}
