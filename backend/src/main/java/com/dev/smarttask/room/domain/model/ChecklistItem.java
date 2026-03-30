package com.dev.smarttask.room.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChecklistItem {

    private UUID id;
    private UUID roomId;
    private String title;
    private UUID assignedToUserId;
    private UUID completedByUserId;

    @Builder.Default
    private ChecklistStatus status = ChecklistStatus.PENDING;

    private BigDecimal estimatedHours;

    @Builder.Default
    private int displayOrder = 0;

    private LocalDateTime completedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
