package com.dev.smarttask.common.adapter.in.web.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record AttachmentResponse(
        UUID id,
        String entityType,
        UUID entityId,
        String url,
        String mimeType,
        int sizeBytes,
        UUID uploadedByUserId,
        LocalDateTime createdAt
) {}
