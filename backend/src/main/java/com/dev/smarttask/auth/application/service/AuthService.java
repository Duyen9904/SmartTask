package com.dev.smarttask.auth.application.service;

import com.dev.smarttask.auth.application.dto.AuthResponse;
import com.dev.smarttask.auth.application.port.in.GetCurrentUserUseCase;
import com.dev.smarttask.auth.application.port.in.LoginUseCase;
import com.dev.smarttask.auth.application.port.in.RefreshTokenUseCase;
import com.dev.smarttask.auth.application.port.in.RegisterUseCase;
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
import com.dev.smarttask.auth.domain.model.RefreshToken;
import com.dev.smarttask.auth.domain.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService implements RegisterUseCase, LoginUseCase, RefreshTokenUseCase, GetCurrentUserUseCase {

    private final UserRepositoryPort userRepository;
    private final RefreshTokenRepositoryPort refreshTokenRepository;
    private final TokenProviderPort tokenProvider;
    private final PasswordEncoderPort passwordEncoder;

    @Override
    public AuthResponse register(RegisterCommand command) {
        if (userRepository.existsByEmail(command.email())) {
            throw new EmailAlreadyExistsException(command.email());
        }

        User user = User.builder()
                .email(command.email())
                .password(passwordEncoder.encode(command.password()))
                .fullName(command.fullName())
                .build();

        User savedUser = userRepository.save(user);
        log.info("User registered successfully: {}", savedUser.getEmail());

        return generateAuthResponse(savedUser);
    }

    @Override
    public AuthResponse login(LoginCommand command) {
        User user = userRepository.findByEmail(command.email())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(command.password(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        log.info("User logged in: {}", user.getEmail());

        // Revoke existing refresh tokens
        refreshTokenRepository.revokeAllByUserId(user.getId());

        return generateAuthResponse(user);
    }

    @Override
    public AuthResponse refresh(RefreshCommand command) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(command.refreshToken())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid refresh token"));

        if (!refreshToken.isValid()) {
            throw new InvalidCredentialsException("Refresh token expired or revoked");
        }

        User user = userRepository.findById(refreshToken.getUserId())
                .orElseThrow(UserNotFoundException::new);

        // Revoke old token
        refreshToken.setRevoked(true);
        refreshTokenRepository.save(refreshToken);

        log.info("Token refreshed for user: {}", user.getEmail());

        return generateAuthResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User getCurrentUser(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
    }

    // ── Private helpers ──

    private AuthResponse generateAuthResponse(User user) {
        String accessToken = tokenProvider.generateAccessToken(user);
        String refreshTokenStr = tokenProvider.generateRefreshToken(user);

        // Save refresh token
        RefreshToken refreshToken = RefreshToken.builder()
                .token(refreshTokenStr)
                .userId(user.getId())
                .expiryDate(LocalDateTime.now().plusDays(7))
                .build();
        refreshTokenRepository.save(refreshToken);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshTokenStr)
                .expiresIn(tokenProvider.getAccessTokenExpirationMs())
                .user(AuthResponse.UserDTO.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .fullName(user.getFullName())
                        .avatarUrl(user.getAvatarUrl())
                        .role(user.getRole().name())
                        .build())
                .build();
    }
}
