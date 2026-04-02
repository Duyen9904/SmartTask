package com.dev.smarttask.common.adapter.in.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.UUID;

public record RequestUploadUrlRequest(
        @NotBlank(message = "Entity type is required")
        String entityType,

        @NotNull(message = "Entity ID is required")
        UUID entityId,

        @NotBlank(message = "Filename is required")
        String filename,

        @NotBlank(message = "Content type is required")
        String contentType,

        @Positive(message = "Size must be positive")
        long sizeBytes
) {}
