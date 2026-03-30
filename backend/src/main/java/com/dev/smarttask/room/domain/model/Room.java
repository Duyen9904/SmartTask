package com.dev.smarttask.room.domain.model;

import com.dev.smarttask.task.domain.model.Priority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a collaboration room.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {

    private UUID id;
    private String roomNumber;
    private String title;
    private String description;
    private LocalDate deadline;

    @Builder.Default
    private Priority priority = Priority.MEDIUM;

    @Builder.Default
    private RoomStatus status = RoomStatus.ACTIVE;

    private UUID createdBy;
    private LocalDateTime deletedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
