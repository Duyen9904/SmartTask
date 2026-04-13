package com.dev.smarttask.template.application.port.in;

import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.template.domain.model.TaskTemplate;

import java.util.List;
import java.util.UUID;

public interface GetTemplateUseCase {
    TaskTemplate getById(UUID templateId);
    List<TaskTemplate> getAllByUser(UUID userId);
    List<Task> getBlueprintsByTemplateId(UUID templateId);
}
