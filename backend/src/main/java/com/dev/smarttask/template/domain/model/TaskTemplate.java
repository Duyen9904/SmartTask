package com.dev.smarttask.template.domain.model;

import com.dev.smarttask.task.domain.model.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a task template.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskTemplate {

    private UUID id;
    private String title;

    @Builder.Default
    private int usageCount = 0;

    @Builder.Default
    private int downloadCount = 0;

    private UUID createdBy;

    @Builder.Default
    private boolean isPublic = false;

    @Builder.Default
    private Category category = Category.PERSONAL;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
