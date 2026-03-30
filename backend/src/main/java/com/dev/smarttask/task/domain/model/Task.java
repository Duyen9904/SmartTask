package com.dev.smarttask.task.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

/**
 * Domain entity representing a task.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    private UUID id;
    private UUID userId;
    private String title;
    private String description;

    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    @Builder.Default
    private TaskStatus status = TaskStatus.PENDING;

    @Builder.Default
    private Category category = Category.PERSONAL;

    private LocalDate scheduledDate;
    private LocalTime scheduledTime;
    private LocalDate dueDate;
    private BigDecimal estimatedHours;
    private UUID sourceTemplateId;

    @Builder.Default
    private int displayOrder = 0;

    private LocalDateTime deletedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
