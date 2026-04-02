package com.dev.smarttask.task.adapter.in.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

public record CreateTaskRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 255, message = "Title must be at most 255 characters")
        String title,

        @Size(max = 5000, message = "Description must be at most 5000 characters")
        String description,

        String priority,
        String category,
        LocalDate scheduledDate,
        LocalTime scheduledTime,
        LocalDate dueDate,

        @Positive(message = "Estimated hours must be positive")
        BigDecimal estimatedHours
) {}
