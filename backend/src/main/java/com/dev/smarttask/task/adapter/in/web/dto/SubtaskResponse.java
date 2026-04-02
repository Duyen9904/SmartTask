package com.dev.smarttask.task.adapter.in.web.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record SubtaskResponse(
        UUID id,
        String title,
        boolean isCompleted,
        int displayOrder,
        LocalDateTime createdAt
) {}
