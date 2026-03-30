package com.dev.smarttask.template.adapter.out.persistence;

import com.dev.smarttask.template.adapter.out.persistence.entity.TemplateSubtaskJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaTemplateSubtaskRepository extends JpaRepository<TemplateSubtaskJpaEntity, UUID> {

    List<TemplateSubtaskJpaEntity> findAllByTemplateIdOrderByDisplayOrder(UUID templateId);
}
