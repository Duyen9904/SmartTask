package com.dev.smarttask.common.adapter.in.web.dto;

import java.time.LocalDateTime;

public record PresignedUrlResponse(
        String url,
        String objectName,
        LocalDateTime expiresAt
) {}
