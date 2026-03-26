package com.dev.smarttask.auth.adapter.in.web.dto;

import java.util.UUID;

public record UserResponse(
        UUID id,
        String email,
        String fullName,
        String avatarUrl,
        String role
) {}
