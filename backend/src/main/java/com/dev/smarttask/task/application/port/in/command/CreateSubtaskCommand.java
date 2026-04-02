package com.dev.smarttask.task.application.port.in.command;

public record CreateSubtaskCommand(
        String title,
        int displayOrder
) {}
