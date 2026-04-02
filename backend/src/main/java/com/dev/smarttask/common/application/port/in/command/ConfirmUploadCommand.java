package com.dev.smarttask.common.application.port.in.command;

import com.dev.smarttask.common.domain.model.EntityType;

import java.util.UUID;

public record ConfirmUploadCommand(
        String objectName,
        EntityType entityType,
        UUID entityId,
        String mimeType,
        int sizeBytes,
        UUID userId
) {}
