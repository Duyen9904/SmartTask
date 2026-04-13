package com.dev.smarttask.template.application.port.in.command;

import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import lombok.Value;

import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Value
public class CreateTemplateCommand {
    UUID userId;
    String title;
    Category category;
    boolean isPublic;
    List<TemplateItemCommand> items;

    @Value
    public static class TemplateItemCommand {
        String title;
        String description;
        Priority priority;
        LocalTime scheduledTime;
        double estimatedHours;
    }
}
