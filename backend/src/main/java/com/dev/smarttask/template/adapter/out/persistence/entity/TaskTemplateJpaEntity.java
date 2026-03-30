package com.dev.smarttask.template.adapter.out.persistence.entity;

import com.dev.smarttask.common.adapter.out.persistence.entity.BaseEntity;
import com.dev.smarttask.task.domain.model.Category;
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

import java.util.UUID;

@Entity
@Table(name = "task_templates")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class TaskTemplateJpaEntity extends BaseEntity {

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "usage_count", nullable = false)
    private int usageCount;

    @Column(name = "download_count", nullable = false)
    private int downloadCount;

    @Column(name = "created_by", nullable = false)
    private UUID createdBy;

    @Column(name = "is_public", nullable = false)
    private boolean isPublic;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Category category;
}
