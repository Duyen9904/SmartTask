package com.dev.smarttask.task.application.port.out;

import com.dev.smarttask.task.domain.model.TaskAssignment;

import java.util.List;
import java.util.UUID;

public interface TaskAssignmentRepositoryPort {

    TaskAssignment save(TaskAssignment assignment);

    List<TaskAssignment> findAllByTaskId(UUID taskId);

    List<TaskAssignment> findAllByUserId(UUID userId);

    boolean existsByTaskIdAndUserId(UUID taskId, UUID userId);

    void deleteByTaskIdAndUserId(UUID taskId, UUID userId);
}
