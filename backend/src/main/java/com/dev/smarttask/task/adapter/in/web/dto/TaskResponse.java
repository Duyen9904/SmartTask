package com.dev.smarttask.task.adapter.in.web.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

public record TaskResponse(
        UUID id,
        String title,
        String description,
        String priority,
        String status,
        String category,
        LocalDate scheduledDate,
        LocalTime scheduledTime,
        LocalDate dueDate,
        BigDecimal estimatedHours,
        int displayOrder,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
