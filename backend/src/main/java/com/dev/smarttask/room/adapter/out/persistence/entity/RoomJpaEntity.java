package com.dev.smarttask.room.adapter.out.persistence.entity;

import com.dev.smarttask.common.adapter.out.persistence.entity.BaseEntity;
import com.dev.smarttask.room.domain.model.RoomStatus;
import com.dev.smarttask.task.domain.model.Priority;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class RoomJpaEntity extends BaseEntity {

    @Column(name = "room_number", length = 20)
    private String roomNumber;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RoomStatus status;

    @Column(name = "created_by", nullable = false)
    private UUID createdBy;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
