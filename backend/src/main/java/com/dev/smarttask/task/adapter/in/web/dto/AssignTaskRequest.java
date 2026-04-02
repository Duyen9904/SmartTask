package com.dev.smarttask.task.adapter.in.web.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AssignTaskRequest(
        @NotNull(message = "User ID is required")
        UUID userId
) {}
