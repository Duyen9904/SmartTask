package com.dev.smarttask.task.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a task assignment (many-to-many between Task and User).
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskAssignment {

    private UUID id;
    private UUID taskId;
    private UUID userId;
    private LocalDateTime assignedAt;
}
