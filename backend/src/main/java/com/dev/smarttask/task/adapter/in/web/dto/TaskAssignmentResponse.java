package com.dev.smarttask.task.adapter.in.web.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskAssignmentResponse(
        UUID id,
        UUID taskId,
        UUID userId,
        LocalDateTime assignedAt
) {}
