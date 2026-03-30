package com.dev.smarttask.template.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * Domain entity representing a subtask within a template.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateSubtask {

    private UUID id;
    private UUID templateId;
    private String title;

    @Builder.Default
    private int displayOrder = 0;
}
