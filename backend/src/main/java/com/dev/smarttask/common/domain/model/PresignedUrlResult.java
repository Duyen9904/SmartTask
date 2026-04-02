package com.dev.smarttask.common.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * Represents a presigned URL result from cloud storage.
 */
@Getter
@Builder
@AllArgsConstructor
public class PresignedUrlResult {

    private final String url;
    private final String objectName;
    private final LocalDateTime expiresAt;
}
