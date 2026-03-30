package com.dev.smarttask.room.adapter.out.persistence.entity;

import com.dev.smarttask.common.adapter.out.persistence.entity.BaseEntity;
import com.dev.smarttask.room.domain.model.ChecklistStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "checklist_items")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ChecklistItemJpaEntity extends BaseEntity {

    @Column(name = "room_id", nullable = false)
    private UUID roomId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "assigned_to_user_id")
    private UUID assignedToUserId;

    @Column(name = "completed_by_user_id")
    private UUID completedByUserId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ChecklistStatus status;

    @Column(name = "estimated_hours", precision = 5, scale = 2)
    private BigDecimal estimatedHours;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
