package com.dev.smarttask.ai.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a focus/Pomodoro session.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FocusSession {

    private UUID id;
    private UUID userId;
    private UUID taskId;
    private int durationMinutes;

    @Builder.Default
    private AmbientSound ambientSound = AmbientSound.NONE;

    private LocalDateTime startedAt;
    private LocalDateTime endedAt;

    @Builder.Default
    private boolean completed = false;
}
