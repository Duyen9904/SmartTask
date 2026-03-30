package com.dev.smarttask.common.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing user preferences.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPreference {

    private UUID userId;

    @Builder.Default
    private String theme = "LIGHT";

    private String timezone;
    private String notificationPrefs; // JSON string
    private LocalDateTime updatedAt;
}
