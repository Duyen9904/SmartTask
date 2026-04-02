package com.dev.smarttask.auth.application.service;

import com.dev.smarttask.auth.application.dto.AuthResponse;
import com.dev.smarttask.auth.application.port.in.command.LoginCommand;
import com.dev.smarttask.auth.application.port.in.command.RefreshCommand;
import com.dev.smarttask.auth.application.port.in.command.RegisterCommand;
import com.dev.smarttask.auth.application.port.out.PasswordEncoderPort;
import com.dev.smarttask.auth.application.port.out.RefreshTokenRepositoryPort;
import com.dev.smarttask.auth.application.port.out.TokenProviderPort;
import com.dev.smarttask.auth.application.port.out.UserRepositoryPort;
import com.dev.smarttask.auth.domain.exception.EmailAlreadyExistsException;
import com.dev.smarttask.auth.domain.exception.InvalidCredentialsException;
import com.dev.smarttask.auth.domain.exception.UserNotFoundException;
import com.dev.smarttask.auth.domain.model.Jwt;
import com.dev.smarttask.auth.domain.model.RefreshToken;
import com.dev.smarttask.auth.domain.model.Role;
import com.dev.smarttask.auth.domain.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService")
class AuthServiceTest {

    @Mock
    private UserRepositoryPort userRepository;

    @Mock
    private RefreshTokenRepositoryPort refreshTokenRepository;

    @Mock
    private TokenProviderPort tokenProvider;

    @Mock
    private PasswordEncoderPort passwordEncoder;

    @InjectMocks
    private AuthService authService;

    private UUID userId;
    private User testUser;
    private Jwt mockJwt;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        testUser = User.builder()
                .id(userId)
                .email("test@example.com")
                .password("encoded-password")
                .fullName("Test User")
                .role(Role.USER)
                .build();

        mockJwt = Jwt.builder()
                .token("access-token")
                .userId(userId)
                .email("test@example.com")
                .role(Role.USER)
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusMillis(900000))
                .build();
    }

    private void stubTokenGeneration() {
        when(tokenProvider.generateJwt(any(UUID.class), any(String.class), any(Role.class)))
                .thenReturn(mockJwt);
        when(tokenProvider.generateRefreshToken()).thenReturn("refresh-token");
        when(tokenProvider.getAccessTokenExpirationMs()).thenReturn(900000L);
        when(refreshTokenRepository.save(any(RefreshToken.class)))
                .thenAnswer(inv -> inv.getArgument(0));
    }

    // ── RegisterUseCase ──

    @Nested
    @DisplayName("register()")
    class RegisterTests {

        @Test
        @DisplayName("registers new user successfully")
        void register_success() {
            RegisterCommand command = new RegisterCommand("new@example.com", "password123", "New User");

            when(userRepository.existsByEmail("new@example.com")).thenReturn(false);
            when(passwordEncoder.encode("password123")).thenReturn("encoded-password");
            when(userRepository.save(any(User.class))).thenAnswer(inv -> {
                User u = inv.getArgument(0);
                u.setId(userId);
                return u;
            });
            stubTokenGeneration();

            AuthResponse response = authService.register(command);

            assertAll(
                    () -> assertNotNull(response),
                    () -> assertEquals("access-token", response.getAccessToken()),
                    () -> assertEquals("refresh-token", response.getRefreshToken()),
                    () -> assertEquals("new@example.com", response.getUser().getEmail())
            );

            verify(userRepository).save(any(User.class));
            verify(refreshTokenRepository).save(any(RefreshToken.class));
        }

        @Test
        @DisplayName("throws EmailAlreadyExistsException when email taken")
        void register_duplicateEmail() {
            RegisterCommand command = new RegisterCommand("taken@example.com", "pass", "User");

            when(userRepository.existsByEmail("taken@example.com")).thenReturn(true);

            assertThrows(EmailAlreadyExistsException.class,
                    () -> authService.register(command));

            verify(userRepository, never()).save(any());
        }
    }

    // ── LoginUseCase ──

    @Nested
    @DisplayName("login()")
    class LoginTests {

        @Test
        @DisplayName("logs in with valid credentials")
        void login_success() {
            LoginCommand command = new LoginCommand("test@example.com", "password123");

            when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
            when(passwordEncoder.matches("password123", "encoded-password")).thenReturn(true);
            stubTokenGeneration();

            AuthResponse response = authService.login(command);

            assertAll(
                    () -> assertEquals("access-token", response.getAccessToken()),
                    () -> assertEquals("refresh-token", response.getRefreshToken())
            );

            verify(refreshTokenRepository).revokeAllByUserId(userId);
        }

        @Test
        @DisplayName("throws InvalidCredentialsException for wrong password")
        void login_wrongPassword() {
            LoginCommand command = new LoginCommand("test@example.com", "wrongpass");

            when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
            when(passwordEncoder.matches("wrongpass", "encoded-password")).thenReturn(false);

            assertThrows(InvalidCredentialsException.class,
                    () -> authService.login(command));
        }

        @Test
        @DisplayName("throws InvalidCredentialsException for non-existent email")
        void login_emailNotFound() {
            LoginCommand command = new LoginCommand("ghost@example.com", "pass");

            when(userRepository.findByEmail("ghost@example.com")).thenReturn(Optional.empty());

            assertThrows(InvalidCredentialsException.class,
                    () -> authService.login(command));
        }
    }

    // ── RefreshTokenUseCase ──

    @Nested
    @DisplayName("refresh()")
    class RefreshTests {

        @Test
        @DisplayName("refreshes token successfully")
        void refresh_success() {
            RefreshCommand command = new RefreshCommand("valid-refresh-token");

            RefreshToken storedToken = RefreshToken.builder()
                    .id(UUID.randomUUID())
                    .token("valid-refresh-token")
                    .userId(userId)
                    .expiryDate(LocalDateTime.now().plusDays(1))
                    .revoked(false)
                    .build();

            when(refreshTokenRepository.findByToken("valid-refresh-token")).thenReturn(Optional.of(storedToken));
            when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));

            Jwt newJwt = Jwt.builder()
                    .token("new-access-token")
                    .userId(userId)
                    .email("test@example.com")
                    .role(Role.USER)
                    .issuedAt(Instant.now())
                    .expiresAt(Instant.now().plusMillis(900000))
                    .build();

            when(tokenProvider.generateJwt(userId, "test@example.com", Role.USER)).thenReturn(newJwt);
            when(tokenProvider.generateRefreshToken()).thenReturn("new-refresh-token");
            when(tokenProvider.getAccessTokenExpirationMs()).thenReturn(900000L);
            when(refreshTokenRepository.save(any(RefreshToken.class))).thenAnswer(inv -> inv.getArgument(0));

            AuthResponse response = authService.refresh(command);

            assertAll(
                    () -> assertEquals("new-access-token", response.getAccessToken()),
                    () -> assertEquals("new-refresh-token", response.getRefreshToken())
            );

            assertTrue(storedToken.isRevoked());
        }

        @Test
        @DisplayName("throws when refresh token not found")
        void refresh_invalidToken() {
            RefreshCommand command = new RefreshCommand("nonexistent-token");

            when(refreshTokenRepository.findByToken("nonexistent-token")).thenReturn(Optional.empty());

            assertThrows(InvalidCredentialsException.class,
                    () -> authService.refresh(command));
        }

        @Test
        @DisplayName("throws when refresh token expired")
        void refresh_expiredToken() {
            RefreshCommand command = new RefreshCommand("expired-token");

            RefreshToken expiredToken = RefreshToken.builder()
                    .token("expired-token")
                    .userId(userId)
                    .expiryDate(LocalDateTime.now().minusDays(1))
                    .revoked(false)
                    .build();

            when(refreshTokenRepository.findByToken("expired-token")).thenReturn(Optional.of(expiredToken));

            assertThrows(InvalidCredentialsException.class,
                    () -> authService.refresh(command));
        }

        @Test
        @DisplayName("throws when refresh token revoked")
        void refresh_revokedToken() {
            RefreshCommand command = new RefreshCommand("revoked-token");

            RefreshToken revokedToken = RefreshToken.builder()
                    .token("revoked-token")
                    .userId(userId)
                    .expiryDate(LocalDateTime.now().plusDays(1))
                    .revoked(true)
                    .build();

            when(refreshTokenRepository.findByToken("revoked-token")).thenReturn(Optional.of(revokedToken));

            assertThrows(InvalidCredentialsException.class,
                    () -> authService.refresh(command));
        }
    }

    // ── GetCurrentUserUseCase ──

    @Nested
    @DisplayName("getCurrentUser()")
    class GetCurrentUserTests {

        @Test
        @DisplayName("returns user when found")
        void getCurrentUser_success() {
            when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));

            User result = authService.getCurrentUser(userId);

            assertEquals(userId, result.getId());
        }

        @Test
        @DisplayName("throws UserNotFoundException when not found")
        void getCurrentUser_notFound() {
            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            assertThrows(UserNotFoundException.class,
                    () -> authService.getCurrentUser(userId));
        }
    }

    // ── LogoutUseCase ──

    @Nested
    @DisplayName("logout()")
    class LogoutTests {

        @Test
        @DisplayName("revokes all refresh tokens for user")
        void logout_revokesTokens() {
            authService.logout(userId);

            verify(refreshTokenRepository).revokeAllByUserId(userId);
        }
    }
}
