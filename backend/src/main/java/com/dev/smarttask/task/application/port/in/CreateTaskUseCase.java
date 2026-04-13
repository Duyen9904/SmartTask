package com.dev.smarttask.task.application.port.in;

import com.dev.smarttask.task.application.port.in.command.CreateTaskCommand;
import com.dev.smarttask.task.domain.model.Task;

public interface CreateTaskUseCase {

    Task create(CreateTaskCommand command);

    java.util.List<Task> copyTasks(java.util.UUID userId, java.time.LocalDate sourceDate, java.time.LocalDate targetDate);
}
