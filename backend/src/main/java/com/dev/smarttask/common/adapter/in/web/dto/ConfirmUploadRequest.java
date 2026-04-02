package com.dev.smarttask.common.adapter.in.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.UUID;

public record ConfirmUploadRequest(
        @NotBlank(message = "Object name is required")
        String objectName,

        @NotBlank(message = "Entity type is required")
        String entityType,

        @NotNull(message = "Entity ID is required")
        UUID entityId,

        @NotBlank(message = "MIME type is required")
        String mimeType,

        @Positive(message = "Size must be positive")
        int sizeBytes
) {}
