package com.dev.smarttask.template.adapter.in.web.dto;

import com.dev.smarttask.task.domain.model.Priority;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalTime;

@Data
public class TemplateItemRequest {
    @NotBlank(message = "Item title is required")
    private String title;
    private String description;
    private Priority priority = Priority.MEDIUM;
    private LocalTime scheduledTime;
    private double estimatedHours;
}
