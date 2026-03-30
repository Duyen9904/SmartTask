package com.dev.smarttask.task.adapter.out.persistence;

import com.dev.smarttask.task.adapter.out.persistence.entity.TaskJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaTaskRepository extends JpaRepository<TaskJpaEntity, UUID> {

    List<TaskJpaEntity> findAllByUserIdAndDeletedAtIsNullOrderByDisplayOrder(UUID userId);

    List<TaskJpaEntity> findAllByUserIdAndStatusAndDeletedAtIsNull(UUID userId, 
            com.dev.smarttask.task.domain.model.TaskStatus status);
}
