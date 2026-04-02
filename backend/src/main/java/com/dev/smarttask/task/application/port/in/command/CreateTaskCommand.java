package com.dev.smarttask.task.application.port.in.command;

import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record CreateTaskCommand(
        UUID userId,
        String title,
        String description,
        Priority priority,
        Category category,
        LocalDate scheduledDate,
        LocalTime scheduledTime,
        LocalDate dueDate,
        BigDecimal estimatedHours
) {}
