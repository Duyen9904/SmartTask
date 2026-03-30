package com.dev.smarttask.template.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.dev.smarttask.common.adapter.out.persistence.id.UUIDv7;

import java.util.UUID;

@Entity
@Table(name = "template_subtasks")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateSubtaskJpaEntity {

    @Id
    @UUIDv7
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "template_id", nullable = false)
    private UUID templateId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;
}
