package com.dev.smarttask.common.application.port.in.command;

import com.dev.smarttask.common.domain.model.EntityType;

import java.util.UUID;

public record RequestUploadCommand(
        EntityType entityType,
        UUID entityId,
        String filename,
        String contentType,
        long sizeBytes,
        UUID userId
) {}
