package com.dev.smarttask.auth.adapter.in.web;

import com.dev.smarttask.auth.adapter.in.web.dto.LoginRequest;
import com.dev.smarttask.auth.adapter.in.web.dto.RefreshRequest;
import com.dev.smarttask.auth.adapter.in.web.dto.RegisterRequest;
import com.dev.smarttask.auth.adapter.in.web.dto.UserResponse;
import com.dev.smarttask.auth.application.dto.AuthResponse;
import com.dev.smarttask.auth.application.port.in.GetCurrentUserUseCase;
import com.dev.smarttask.auth.application.port.in.LoginUseCase;
import com.dev.smarttask.auth.application.port.in.LogoutUseCase;
import com.dev.smarttask.auth.application.port.in.RefreshTokenUseCase;
import com.dev.smarttask.auth.application.port.in.RegisterUseCase;
import com.dev.smarttask.auth.application.port.in.command.LoginCommand;
import com.dev.smarttask.auth.application.port.in.command.RefreshCommand;
import com.dev.smarttask.auth.application.port.in.command.RegisterCommand;
import com.dev.smarttask.auth.domain.model.User;
import com.dev.smarttask.common.adapter.in.web.dto.ApiResponse;
import com.dev.smarttask.common.adapter.in.web.security.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Auth endpoints: register, login, refresh, current user")
public class AuthController {

    private final RegisterUseCase registerUseCase;
    private final LoginUseCase loginUseCase;
    private final RefreshTokenUseCase refreshTokenUseCase;
    private final GetCurrentUserUseCase getCurrentUserUseCase;
    private final LogoutUseCase logoutUseCase;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request) {

        RegisterCommand command = new RegisterCommand(
                request.email(), request.password(), request.fullName());

        AuthResponse response = registerUseCase.register(command);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(response, "User registered successfully"));
    }

    @PostMapping("/login")
    @Operation(summary = "Login with email and password")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request) {

        LoginCommand command = new LoginCommand(request.email(), request.password());

        AuthResponse response = loginUseCase.login(command);

        return ResponseEntity.ok(ApiResponse.success(response, "Login successful"));
    }

    @PostMapping("/refresh")
    @Operation(summary = "Refresh access token")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(
            @Valid @RequestBody RefreshRequest request) {

        RefreshCommand command = new RefreshCommand(request.refreshToken());

        AuthResponse response = refreshTokenUseCase.refresh(command);

        return ResponseEntity.ok(ApiResponse.success(response, "Token refreshed"));
    }

    @PostMapping("/logout")
    @Operation(summary = "Logout and revoke all refresh tokens")
    public ResponseEntity<ApiResponse<Void>> logout(
            @CurrentUser UUID userId) {

        logoutUseCase.logout(userId);

        return ResponseEntity.ok(ApiResponse.success(null, "Logged out successfully"));
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser(
            @CurrentUser UUID userId) {

        User user = getCurrentUserUseCase.getCurrentUser(userId);

        UserResponse response = new UserResponse(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getAvatarUrl(),
                user.getRole().name()
        );

        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
