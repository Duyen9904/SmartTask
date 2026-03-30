package com.dev.smarttask.social.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a mood journal entry.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MoodEntry {

    private UUID id;
    private UUID userId;
    private short mood;  // 1-5
    private String note;
    private LocalDateTime loggedAt;
}
