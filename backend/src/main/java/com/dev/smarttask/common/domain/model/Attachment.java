package com.dev.smarttask.common.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a file attachment (polymorphic).
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Attachment {

    private UUID id;
    private EntityType entityType;
    private UUID entityId;
    private String url;
    private String mimeType;
    private int sizeBytes;
    private UUID uploadedByUserId;
    private LocalDateTime createdAt;
}
