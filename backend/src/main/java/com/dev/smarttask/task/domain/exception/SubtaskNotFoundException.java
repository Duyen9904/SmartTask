package com.dev.smarttask.task.domain.exception;

import java.util.UUID;

public class SubtaskNotFoundException extends RuntimeException {

    public SubtaskNotFoundException(UUID subtaskId) {
        super("Subtask not found: " + subtaskId);
    }

    public SubtaskNotFoundException(String message) {
        super(message);
    }
}
