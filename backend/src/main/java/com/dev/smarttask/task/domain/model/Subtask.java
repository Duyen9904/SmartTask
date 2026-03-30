package com.dev.smarttask.task.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a subtask of a parent task.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Subtask {

    private UUID id;
    private UUID parentTaskId;
    private String title;

    @Builder.Default
    private boolean isCompleted = false;

    @Builder.Default
    private int displayOrder = 0;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
