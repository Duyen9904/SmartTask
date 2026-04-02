package com.dev.smarttask.task.adapter.out.persistence;

import com.dev.smarttask.task.adapter.out.persistence.entity.TaskAssignmentJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaTaskAssignmentRepository extends JpaRepository<TaskAssignmentJpaEntity, UUID> {

    List<TaskAssignmentJpaEntity> findAllByTaskId(UUID taskId);

    List<TaskAssignmentJpaEntity> findAllByUserId(UUID userId);

    boolean existsByTaskIdAndUserId(UUID taskId, UUID userId);

    void deleteByTaskIdAndUserId(UUID taskId, UUID userId);
}
