package com.dev.smarttask.template.adapter.out.persistence;

import com.dev.smarttask.template.adapter.out.persistence.entity.TaskTemplateJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaTaskTemplateRepository extends JpaRepository<TaskTemplateJpaEntity, UUID> {

    List<TaskTemplateJpaEntity> findAllByCreatedBy(UUID createdBy);

    List<TaskTemplateJpaEntity> findAllByIsPublicTrue();
}
