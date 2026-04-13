package com.dev.smarttask.template.application.service;

import com.dev.smarttask.template.domain.exception.TemplateNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.dev.smarttask.task.application.port.out.TaskRepositoryPort;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.task.domain.model.TaskStatus;
import com.dev.smarttask.template.application.port.in.ApplyTemplateUseCase;
import com.dev.smarttask.template.application.port.in.CreateTemplateUseCase;
import com.dev.smarttask.template.application.port.in.DeleteTemplateUseCase;
import com.dev.smarttask.template.application.port.in.GetTemplateUseCase;
import com.dev.smarttask.template.application.port.in.command.ApplyTemplateCommand;
import com.dev.smarttask.template.application.port.in.command.CreateTemplateCommand;
import com.dev.smarttask.template.application.port.out.TemplateRepositoryPort;
import com.dev.smarttask.template.domain.model.TaskTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TemplateService implements CreateTemplateUseCase, ApplyTemplateUseCase, DeleteTemplateUseCase, GetTemplateUseCase {

    private final TemplateRepositoryPort templateRepositoryPort;
    private final TaskRepositoryPort taskRepositoryPort;

    @Override
    public TaskTemplate create(CreateTemplateCommand command) {
        TaskTemplate templateToSave = TaskTemplate.builder()
                .title(command.getTitle())
                .category(command.getCategory())
                .isPublic(command.isPublic())
                .createdBy(command.getUserId())
                .build();

        TaskTemplate savedTemplate = templateRepositoryPort.save(templateToSave);

        // Save blueprints
        int order = 0;
        for (CreateTemplateCommand.TemplateItemCommand itemCommand : command.getItems()) {
            Task blueprint = Task.builder()
                    .userId(command.getUserId())
                    .parentTemplateId(savedTemplate.getId())
                    .title(itemCommand.getTitle())
                    .description(itemCommand.getDescription())
                    .priority(itemCommand.getPriority())
                    .category(command.getCategory())
                    .scheduledTime(itemCommand.getScheduledTime())
                    .estimatedHours(itemCommand.getEstimatedHours() != 0 ? java.math.BigDecimal.valueOf(itemCommand.getEstimatedHours()) : null)
                    .displayOrder(order++)
                    .status(TaskStatus.PENDING) // Status is ignored for blueprints, but kept for not null constraint
                    .build();
            taskRepositoryPort.save(blueprint);
        }

        return savedTemplate;
    }

    @Override
    public TaskTemplate createFromDate(UUID userId, java.time.LocalDate sourceDate, String title) {
        List<Task> existingTasks = taskRepositoryPort.findAllByDate(userId, sourceDate);

        TaskTemplate templateToSave = TaskTemplate.builder()
                .title(title)
                .category(com.dev.smarttask.task.domain.model.Category.PERSONAL)
                .isPublic(false)
                .createdBy(userId)
                .build();

        TaskTemplate savedTemplate = templateRepositoryPort.save(templateToSave);

        int order = 0;
        for (Task task : existingTasks) {
            Task blueprint = Task.builder()
                    .userId(userId)
                    .parentTemplateId(savedTemplate.getId())
                    .title(task.getTitle())
                    .description(task.getDescription())
                    .priority(task.getPriority())
                    .category(task.getCategory())
                    .scheduledTime(task.getScheduledTime())
                    .estimatedHours(task.getEstimatedHours())
                    .displayOrder(order++)
                    .status(TaskStatus.PENDING)
                    .build();
            taskRepositoryPort.save(blueprint);
        }

        return savedTemplate;
    }

    @Override
    public List<Task> apply(ApplyTemplateCommand command) {
        TaskTemplate template = templateRepositoryPort.findById(command.getTemplateId())
                .orElseThrow(() -> new TemplateNotFoundException(command.getTemplateId()));

        List<Task> blueprints = taskRepositoryPort.findBlueprintsByTemplateId(template.getId());

        Map<Integer, ApplyTemplateCommand.ApplyItemOverrideCommand> overridesByOrder = command.getOverrides() != null
                ? command.getOverrides().stream().collect(Collectors.toMap(
                        ApplyTemplateCommand.ApplyItemOverrideCommand::getDisplayOrder, Function.identity()))
                : Map.of();

        List<Task> createdTasks = new ArrayList<>();

        for (Task blueprint : blueprints) {
            ApplyTemplateCommand.ApplyItemOverrideCommand override = overridesByOrder.get(blueprint.getDisplayOrder());

            if (override != null && override.isSkip()) {
                continue;
            }

            Task newTask = Task.builder()
                    .userId(command.getUserId())
                    .sourceTemplateId(template.getId())
                    .scheduledDate(command.getTargetDate())
                    .status(TaskStatus.PENDING)
                    .title(override != null && override.getTitle() != null ? override.getTitle() : blueprint.getTitle())
                    .description(blueprint.getDescription())
                    .priority(override != null && override.getPriority() != null ? override.getPriority() : blueprint.getPriority())
                    .category(blueprint.getCategory())
                    .scheduledTime(override != null && override.getScheduledTime() != null ? override.getScheduledTime() : blueprint.getScheduledTime())
                    .estimatedHours(blueprint.getEstimatedHours())
                    .displayOrder(blueprint.getDisplayOrder())
                    .build();

            createdTasks.add(taskRepositoryPort.save(newTask));
        }

        // Increment usage count safely
        template.setUsageCount(template.getUsageCount() + 1);
        templateRepositoryPort.save(template);

        return createdTasks;
    }

    @Override
    public void delete(UUID templateId, UUID userId) {
        TaskTemplate template = templateRepositoryPort.findById(templateId)
                .orElseThrow(() -> new TemplateNotFoundException(templateId));

        if (!template.getCreatedBy().equals(userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to delete this template");
        }

        templateRepositoryPort.deleteById(templateId);
    }

    @Override
    @Transactional(readOnly = true)
    public TaskTemplate getById(UUID templateId) {
        return templateRepositoryPort.findById(templateId)
                .orElseThrow(() -> new TemplateNotFoundException(templateId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskTemplate> getAllByUser(UUID userId) {
        return templateRepositoryPort.findAllByCreatedBy(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> getBlueprintsByTemplateId(UUID templateId) {
        return taskRepositoryPort.findBlueprintsByTemplateId(templateId);
    }
}
