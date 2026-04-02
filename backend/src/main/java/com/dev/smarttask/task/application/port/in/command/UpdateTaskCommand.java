package com.dev.smarttask.task.application.port.in.command;

import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import com.dev.smarttask.task.domain.model.TaskStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

public record UpdateTaskCommand(
        UUID userId,
        String title,
        String description,
        Priority priority,
        TaskStatus status,
        Category category,
        LocalDate scheduledDate,
        LocalTime scheduledTime,
        LocalDate dueDate,
        BigDecimal estimatedHours,
        Integer displayOrder
) {}
