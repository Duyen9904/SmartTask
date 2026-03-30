package com.dev.smarttask.ai.adapter.out.persistence.entity;

import com.dev.smarttask.ai.domain.model.AmbientSound;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.dev.smarttask.common.adapter.out.persistence.id.UUIDv7;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "focus_sessions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FocusSessionJpaEntity {

    @Id
    @UUIDv7
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "task_id")
    private UUID taskId;

    @Column(name = "duration_minutes", nullable = false)
    private int durationMinutes;

    @Enumerated(EnumType.STRING)
    @Column(name = "ambient_sound", nullable = false, length = 20)
    private AmbientSound ambientSound;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt;

    @Column(name = "ended_at")
    private LocalDateTime endedAt;

    @Column(nullable = false)
    private boolean completed;
}
