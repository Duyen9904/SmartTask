package com.dev.smarttask.task.application.port.in;

import com.dev.smarttask.task.application.port.in.command.CreateSubtaskCommand;
import com.dev.smarttask.task.domain.model.Subtask;

import java.util.List;
import java.util.UUID;

public interface ManageSubtaskUseCase {

    Subtask addSubtask(UUID parentTaskId, UUID userId, CreateSubtaskCommand command);

    Subtask toggleCompletion(UUID subtaskId, UUID userId);

    void deleteSubtask(UUID subtaskId, UUID userId);

    List<Subtask> getSubtasksByTask(UUID parentTaskId);
}
