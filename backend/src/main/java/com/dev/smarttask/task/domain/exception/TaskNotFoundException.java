package com.dev.smarttask.task.domain.exception;

import java.util.UUID;

public class TaskNotFoundException extends RuntimeException {

    public TaskNotFoundException(UUID taskId) {
        super("Task not found: " + taskId);
    }

    public TaskNotFoundException(String message) {
        super(message);
    }
}
