package com.dev.smarttask.task.adapter.out.persistence.entity;

import com.dev.smarttask.common.adapter.out.persistence.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Entity
@Table(name = "subtasks")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class SubtaskJpaEntity extends BaseEntity {

    @Column(name = "parent_task_id", nullable = false)
    private UUID parentTaskId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "is_completed", nullable = false)
    private boolean isCompleted;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;
}
