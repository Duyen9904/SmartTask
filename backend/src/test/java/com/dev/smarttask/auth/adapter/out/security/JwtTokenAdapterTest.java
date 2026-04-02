package com.dev.smarttask.auth.adapter.out.security;

import com.dev.smarttask.auth.domain.model.Jwt;
import com.dev.smarttask.auth.domain.model.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("JwtTokenAdapter")
class JwtTokenAdapterTest {

    private JwtTokenAdapter jwtTokenAdapter;
    private UUID userId;
    private String email;
    private Role role;

    @BeforeEach
    void setUp() {
        String secret = "test-secret-key-that-is-at-least-64-characters-long-for-hmac-sha-algorithm";
        jwtTokenAdapter = new JwtTokenAdapter(secret, 900000L, 604800000L);

        userId = UUID.randomUUID();
        email = "test@example.com";
        role = Role.USER;
    }

    @Nested
    @DisplayName("generateJwt()")
    class GenerateJwtTests {

        @Test
        @DisplayName("returns Jwt with all claims populated")
        void generateJwt_allClaims() {
            Jwt jwt = jwtTokenAdapter.generateJwt(userId, email, role);

            assertAll(
                    () -> assertNotNull(jwt.getToken()),
                    () -> assertFalse(jwt.getToken().isBlank()),
                    () -> assertEquals(userId, jwt.getUserId()),
                    () -> assertEquals(email, jwt.getEmail()),
                    () -> assertEquals(Role.USER, jwt.getRole()),
                    () -> assertNotNull(jwt.getIssuedAt()),
                    () -> assertNotNull(jwt.getExpiresAt()),
                    () -> assertTrue(jwt.getExpiresAt().isAfter(jwt.getIssuedAt()))
            );
        }

        @Test
        @DisplayName("generated token is valid")
        void generateJwt_tokenIsValid() {
            Jwt jwt = jwtTokenAdapter.generateJwt(userId, email, role);

            assertTrue(jwtTokenAdapter.validateToken(jwt.getToken()));
        }
    }

    @Nested
    @DisplayName("generateToken()")
    class GenerateTokenTests {

        @Test
        @DisplayName("returns non-null token string")
        void generateToken_notNull() {
            String token = jwtTokenAdapter.generateToken(userId, email, role);

            assertNotNull(token);
            assertFalse(token.isBlank());
        }
    }

    @Nested
    @DisplayName("parseJwt()")
    class ParseJwtTests {

        @Test
        @DisplayName("round-trips all claims correctly")
        void parseJwt_roundTrip() {
            Jwt generated = jwtTokenAdapter.generateJwt(userId, email, role);
            Jwt parsed = jwtTokenAdapter.parseJwt(generated.getToken());

            assertAll(
                    () -> assertEquals(userId, parsed.getUserId()),
                    () -> assertEquals(email, parsed.getEmail()),
                    () -> assertEquals(Role.USER, parsed.getRole()),
                    () -> assertEquals(generated.getToken(), parsed.getToken())
            );
        }

        @Test
        @DisplayName("parses ADMIN role correctly")
        void parseJwt_adminRole() {
            Jwt jwt = jwtTokenAdapter.generateJwt(UUID.randomUUID(), "admin@example.com", Role.ADMIN);
            Jwt parsed = jwtTokenAdapter.parseJwt(jwt.getToken());

            assertEquals(Role.ADMIN, parsed.getRole());
        }

        @Test
        @DisplayName("throws on invalid token")
        void parseJwt_invalid() {
            assertThrows(Exception.class,
                    () -> jwtTokenAdapter.parseJwt("completely.invalid.token"));
        }
    }

    @Nested
    @DisplayName("validateToken()")
    class ValidateTokenTests {

        @Test
        @DisplayName("returns true for valid token")
        void validateToken_valid() {
            String token = jwtTokenAdapter.generateToken(userId, email, role);

            assertTrue(jwtTokenAdapter.validateToken(token));
        }

        @Test
        @DisplayName("returns false for invalid token")
        void validateToken_invalid() {
            assertFalse(jwtTokenAdapter.validateToken("completely.invalid.token"));
        }

        @Test
        @DisplayName("returns false for null token")
        void validateToken_null() {
            assertFalse(jwtTokenAdapter.validateToken(null));
        }

        @Test
        @DisplayName("returns false for expired token")
        void validateToken_expired() {
            JwtTokenAdapter expiredAdapter = new JwtTokenAdapter(
                    "test-secret-key-that-is-at-least-64-characters-long-for-hmac-sha-algorithm",
                    0L, 0L);
            String token = expiredAdapter.generateToken(userId, email, role);

            assertFalse(expiredAdapter.validateToken(token));
        }
    }

    @Nested
    @DisplayName("generateRefreshToken()")
    class GenerateRefreshTokenTests {

        @Test
        @DisplayName("generates a non-null UUID string")
        void generateRefreshToken_notNull() {
            String token = jwtTokenAdapter.generateRefreshToken();

            assertNotNull(token);
            assertDoesNotThrow(() -> UUID.fromString(token));
        }

        @Test
        @DisplayName("generates unique tokens each call")
        void generateRefreshToken_unique() {
            String token1 = jwtTokenAdapter.generateRefreshToken();
            String token2 = jwtTokenAdapter.generateRefreshToken();

            assertNotEquals(token1, token2);
        }
    }

    @Nested
    @DisplayName("createTokenFromRefreshToken()")
    class CreateFromRefreshTests {

        @Test
        @DisplayName("generates valid access token")
        void createTokenFromRefreshToken_valid() {
            String token = jwtTokenAdapter.createTokenFromRefreshToken(userId, email, role);

            assertTrue(jwtTokenAdapter.validateToken(token));
            Jwt parsed = jwtTokenAdapter.parseJwt(token);
            assertEquals(userId, parsed.getUserId());
        }
    }

    @Nested
    @DisplayName("getAccessTokenExpirationMs()")
    class ExpirationTests {

        @Test
        @DisplayName("returns configured expiration")
        void getAccessTokenExpirationMs_returnsConfigured() {
            assertEquals(900000L, jwtTokenAdapter.getAccessTokenExpirationMs());
        }
    }
}
