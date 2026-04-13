package com.dev.smarttask.template.application.port.in.command;

import com.dev.smarttask.task.domain.model.Priority;
import lombok.Value;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Value
public class ApplyTemplateCommand {
    UUID userId;
    UUID templateId;
    LocalDate targetDate;
    List<ApplyItemOverrideCommand> overrides;

    @Value
    public static class ApplyItemOverrideCommand {
        int displayOrder;
        String title;
        Priority priority;
        LocalTime scheduledTime;
        boolean skip;
    }
}
