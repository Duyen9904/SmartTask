package com.dev.smarttask.template.adapter.in.web;

import com.dev.smarttask.common.adapter.in.web.dto.ApiResponse;
import com.dev.smarttask.common.adapter.in.web.security.CurrentUser;
import com.dev.smarttask.task.adapter.in.web.dto.TaskResponse;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.template.adapter.in.web.dto.ApplyTemplateRequest;
import com.dev.smarttask.template.adapter.in.web.dto.CreateTemplateRequest;
import com.dev.smarttask.template.adapter.in.web.dto.SaveFromDateRequest;
import com.dev.smarttask.template.adapter.in.web.dto.TemplateDetailResponse;
import com.dev.smarttask.template.adapter.in.web.dto.TemplateItemResponse;
import com.dev.smarttask.template.adapter.in.web.dto.TemplateResponse;
import com.dev.smarttask.template.application.port.in.ApplyTemplateUseCase;
import com.dev.smarttask.template.application.port.in.CreateTemplateUseCase;
import com.dev.smarttask.template.application.port.in.DeleteTemplateUseCase;
import com.dev.smarttask.template.application.port.in.GetTemplateUseCase;
import com.dev.smarttask.template.application.port.in.command.ApplyTemplateCommand;
import com.dev.smarttask.template.application.port.in.command.CreateTemplateCommand;
import com.dev.smarttask.template.domain.model.TaskTemplate;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/templates")
@RequiredArgsConstructor
public class TemplateController {

    private final CreateTemplateUseCase createTemplateUseCase;
    private final ApplyTemplateUseCase applyTemplateUseCase;
    private final DeleteTemplateUseCase deleteTemplateUseCase;
    private final GetTemplateUseCase getTemplateUseCase;

    @PostMapping
    public ResponseEntity<ApiResponse<TemplateResponse>> createTemplate(
            @CurrentUser UUID userId,
            @Valid @RequestBody CreateTemplateRequest request) {

        CreateTemplateCommand command = new CreateTemplateCommand(
                userId,
                request.getTitle(),
                request.getCategory(),
                request.isPublic(),
                request.getItems().stream().map(item -> new CreateTemplateCommand.TemplateItemCommand(
                        item.getTitle(), item.getDescription(), item.getPriority(),
                        item.getScheduledTime(), item.getEstimatedHours()
                )).collect(Collectors.toList())
        );

        TaskTemplate template = createTemplateUseCase.create(command);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(toResponse(template)));
    }

    @PostMapping("/from-date")
    public ResponseEntity<ApiResponse<TemplateResponse>> saveFromDate(
            @CurrentUser UUID userId,
            @Valid @RequestBody SaveFromDateRequest request) {
        
        TaskTemplate template = createTemplateUseCase.createFromDate(userId, request.getSourceDate(), request.getTemplateTitle());
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(toResponse(template)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TemplateResponse>>> getTemplates(@CurrentUser UUID userId) {
        List<TemplateResponse> templates = getTemplateUseCase.getAllByUser(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ApiResponse.success(templates));
    }

    @GetMapping("/{templateId}")
    public ResponseEntity<ApiResponse<TemplateDetailResponse>> getTemplateDetail(
            @CurrentUser UUID userId,
            @PathVariable UUID templateId) {

        TaskTemplate template = getTemplateUseCase.getById(templateId);
        List<Task> blueprints = getTemplateUseCase.getBlueprintsByTemplateId(templateId);

        TemplateDetailResponse response = TemplateDetailResponse.builder()
                .id(template.getId())
                .title(template.getTitle())
                .category(template.getCategory())
                .isPublic(template.isPublic())
                .usageCount(template.getUsageCount())
                .createdAt(template.getCreatedAt())
                .items(blueprints.stream().map(b -> TemplateItemResponse.builder()
                        .title(b.getTitle())
                        .description(b.getDescription())
                        .priority(b.getPriority())
                        .scheduledTime(b.getScheduledTime())
                        .estimatedHours(b.getEstimatedHours() != null ? b.getEstimatedHours().doubleValue() : 0.0)
                        .displayOrder(b.getDisplayOrder())
                        .build()).collect(Collectors.toList()))
                .build();

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PostMapping("/{templateId}/apply")
    public ResponseEntity<ApiResponse<List<TaskResponse>>> applyTemplate(
            @CurrentUser UUID userId,
            @PathVariable UUID templateId,
            @Valid @RequestBody ApplyTemplateRequest request) {

        List<ApplyTemplateCommand.ApplyItemOverrideCommand> overrides = request.getOverrides() != null
                ? request.getOverrides().stream().map(o -> new ApplyTemplateCommand.ApplyItemOverrideCommand(
                        o.getDisplayOrder(), o.getTitle(), o.getPriority(), o.getScheduledTime(), o.isSkip()
                )).collect(Collectors.toList())
                : null;

        ApplyTemplateCommand command = new ApplyTemplateCommand(
                userId, templateId, request.getTargetDate(), overrides);

        List<Task> createdTasks = applyTemplateUseCase.apply(command);

        List<TaskResponse> responses = createdTasks.stream()
                .map(this::toTaskResponse)
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(responses));
    }

    @DeleteMapping("/{templateId}")
    public ResponseEntity<ApiResponse<Void>> deleteTemplate(
            @CurrentUser UUID userId,
            @PathVariable UUID templateId) {
        
        deleteTemplateUseCase.delete(templateId, userId);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    private TemplateResponse toResponse(TaskTemplate template) {
        return TemplateResponse.builder()
                .id(template.getId())
                .title(template.getTitle())
                .category(template.getCategory())
                .isPublic(template.isPublic())
                .usageCount(template.getUsageCount())
                .createdAt(template.getCreatedAt())
                .build();
    }

    private TaskResponse toTaskResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority() != null ? task.getPriority().name() : null,
                task.getStatus() != null ? task.getStatus().name() : null,
                task.getCategory() != null ? task.getCategory().name() : null,
                task.getScheduledDate(),
                task.getScheduledTime(),
                task.getDueDate(),
                task.getEstimatedHours(),
                task.getDisplayOrder(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }
}
