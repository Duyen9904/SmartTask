package com.dev.smarttask.task.application.port.in;

import com.dev.smarttask.task.application.port.in.command.UpdateTaskCommand;
import com.dev.smarttask.task.domain.model.Task;

import java.util.UUID;

public interface UpdateTaskUseCase {

    Task update(UUID taskId, UpdateTaskCommand command);
}
