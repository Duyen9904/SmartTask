package com.dev.smarttask.task.application.port.in;

import com.dev.smarttask.task.domain.model.TaskAssignment;

import java.util.List;
import java.util.UUID;

public interface ManageTaskAssignmentUseCase {

    TaskAssignment assign(UUID taskId, UUID assigneeUserId, UUID requestingUserId);

    void unassign(UUID taskId, UUID assigneeUserId, UUID requestingUserId);

    List<TaskAssignment> getAssignmentsByTask(UUID taskId);
}
