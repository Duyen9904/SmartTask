package com.dev.smarttask.task.adapter.in.web;

import com.dev.smarttask.common.adapter.in.web.dto.ApiResponse;
import com.dev.smarttask.common.adapter.in.web.dto.PagedApiResponse;
import com.dev.smarttask.common.adapter.in.web.security.CurrentUser;
import com.dev.smarttask.task.adapter.in.web.dto.AssignTaskRequest;
import com.dev.smarttask.task.adapter.in.web.dto.CreateSubtaskRequest;
import com.dev.smarttask.task.adapter.in.web.dto.CreateTaskRequest;
import com.dev.smarttask.task.adapter.in.web.dto.SubtaskResponse;
import com.dev.smarttask.task.adapter.in.web.dto.TaskAssignmentResponse;
import com.dev.smarttask.task.adapter.in.web.dto.TaskDetailResponse;
import com.dev.smarttask.task.adapter.in.web.dto.TaskResponse;
import com.dev.smarttask.task.adapter.in.web.dto.UpdateTaskRequest;
import com.dev.smarttask.task.application.port.in.CreateTaskUseCase;
import com.dev.smarttask.task.application.port.in.DeleteTaskUseCase;
import com.dev.smarttask.task.application.port.in.GetTaskUseCase;
import com.dev.smarttask.task.application.port.in.ManageSubtaskUseCase;
import com.dev.smarttask.task.application.port.in.ManageTaskAssignmentUseCase;
import com.dev.smarttask.task.application.port.in.UpdateTaskUseCase;
import com.dev.smarttask.task.application.port.in.command.CreateSubtaskCommand;
import com.dev.smarttask.task.application.port.in.command.CreateTaskCommand;
import com.dev.smarttask.task.application.port.in.command.UpdateTaskCommand;
import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import com.dev.smarttask.task.domain.model.Subtask;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.task.domain.model.TaskAssignment;
import com.dev.smarttask.task.domain.model.TaskStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@Tag(name = "Task Management", description = "CRUD operations for tasks, subtasks, and assignments")
public class TaskController {

    private final CreateTaskUseCase createTaskUseCase;
    private final GetTaskUseCase getTaskUseCase;
    private final UpdateTaskUseCase updateTaskUseCase;
    private final DeleteTaskUseCase deleteTaskUseCase;
    private final ManageSubtaskUseCase manageSubtaskUseCase;
    private final ManageTaskAssignmentUseCase manageTaskAssignmentUseCase;

    // ── Task CRUD ──

    @PostMapping
    @Operation(summary = "Create a new task")
    public ResponseEntity<ApiResponse<TaskResponse>> createTask(
            @CurrentUser UUID userId,
            @Valid @RequestBody CreateTaskRequest request) {

        CreateTaskCommand command = new CreateTaskCommand(
                userId,
                request.title(),
                request.description(),
                parseEnum(Priority.class, request.priority()),
                parseEnum(Category.class, request.category()),
                request.scheduledDate(),
                request.scheduledTime(),
                request.dueDate(),
                request.estimatedHours()
        );

        Task task = createTaskUseCase.create(command);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(toResponse(task), "Task created successfully"));
    }

    @GetMapping
    @Operation(summary = "List tasks for current user")
    public ResponseEntity<ApiResponse<List<TaskResponse>>> getTasks(
            @CurrentUser UUID userId,
            @RequestParam(required = false) String status) {

        List<Task> tasks;
        if (status != null) {
            TaskStatus taskStatus = parseEnum(TaskStatus.class, status);
            tasks = getTaskUseCase.getByUserAndStatus(userId, taskStatus);
        } else {
            tasks = getTaskUseCase.getAllByUser(userId);
        }

        List<TaskResponse> responses = tasks.stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(ApiResponse.success(responses));
    }

    @GetMapping("/search")
    @Operation(summary = "Search tasks with filters and pagination")
    public ResponseEntity<PagedApiResponse<TaskResponse>> searchTasks(
            @CurrentUser UUID userId,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) LocalDate from,
            @RequestParam(required = false) LocalDate to,
            @RequestParam(required = false) String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "displayOrder") String sort) {

        Pageable pageable = PageRequest.of(page, Math.min(size, 100), Sort.by(sort));

        Page<Task> taskPage = getTaskUseCase.searchTasks(
                userId,
                parseEnum(TaskStatus.class, status),
                parseEnum(Priority.class, priority),
                parseEnum(Category.class, category),
                from, to, q, pageable);

        Page<TaskResponse> responsePage = taskPage.map(this::toResponse);

        return ResponseEntity.ok(PagedApiResponse.of(responsePage));
    }

    @GetMapping("/{taskId}")
    @Operation(summary = "Get task details with subtasks")
    public ResponseEntity<ApiResponse<TaskDetailResponse>> getTaskById(
            @CurrentUser UUID userId,
            @PathVariable UUID taskId) {

        Task task = getTaskUseCase.getById(taskId, userId);
        List<Subtask> subtasks = manageSubtaskUseCase.getSubtasksByTask(taskId);

        TaskDetailResponse response = toDetailResponse(task, subtasks);

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{taskId}")
    @Operation(summary = "Update a task")
    public ResponseEntity<ApiResponse<TaskResponse>> updateTask(
            @CurrentUser UUID userId,
            @PathVariable UUID taskId,
            @Valid @RequestBody UpdateTaskRequest request) {

        UpdateTaskCommand command = new UpdateTaskCommand(
                userId,
                request.title(),
                request.description(),
                parseEnum(Priority.class, request.priority()),
                parseEnum(TaskStatus.class, request.status()),
                parseEnum(Category.class, request.category()),
                request.scheduledDate(),
                request.scheduledTime(),
                request.dueDate(),
                request.estimatedHours(),
                request.displayOrder()
        );

        Task task = updateTaskUseCase.update(taskId, command);

        return ResponseEntity.ok(ApiResponse.success(toResponse(task), "Task updated successfully"));
    }

    @DeleteMapping("/{taskId}")
    @Operation(summary = "Soft-delete a task")
    public ResponseEntity<Void> deleteTask(
            @CurrentUser UUID userId,
            @PathVariable UUID taskId) {

        deleteTaskUseCase.softDelete(taskId, userId);

        return ResponseEntity.noContent().build();
    }

    // ── Subtask Operations ──

    @PostMapping("/{taskId}/subtasks")
    @Operation(summary = "Add a subtask to a task")
    public ResponseEntity<ApiResponse<SubtaskResponse>> addSubtask(
            @CurrentUser UUID userId,
            @PathVariable UUID taskId,
            @Valid @RequestBody CreateSubtaskRequest request) {

        CreateSubtaskCommand command = new CreateSubtaskCommand(
                request.title(),
                request.displayOrder()
        );

        Subtask subtask = manageSubtaskUseCase.addSubtask(taskId, userId, command);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(toSubtaskResponse(subtask), "Subtask added"));
    }

    @PatchMapping("/{taskId}/subtasks/{subtaskId}/toggle")
    @Operation(summary = "Toggle subtask completion")
    public ResponseEntity<ApiResponse<SubtaskResponse>> toggleSubtask(
            @CurrentUser UUID userId,
            @PathVariable UUID taskId,
            @PathVariable UUID subtaskId) {

        Subtask subtask = manageSubtaskUseCase.toggleCompletion(subtaskId, userId);

        return ResponseEntity.ok(ApiResponse.success(toSubtaskResponse(subtask)));
    }

    @DeleteMapping("/{taskId}/subtasks/{subtaskId}")
    @Operation(summary = "Delete a subtask")
    public ResponseEntity<Void> deleteSubtask(
            @CurrentUser UUID userId,
            @PathVariable UUID taskId,
            @PathVariable UUID subtaskId) {

        manageSubtaskUseCase.deleteSubtask(subtaskId, userId);

        return ResponseEntity.noContent().build();
    }

    // ── Assignment Operations ──

    @PostMapping("/{taskId}/assignments")
    @Operation(summary = "Assign a user to a task")
    public ResponseEntity<ApiResponse<TaskAssignmentResponse>> assignUser(
            @CurrentUser UUID userId,
            @PathVariable UUID taskId,
            @Valid @RequestBody AssignTaskRequest request) {

        TaskAssignment assignment = manageTaskAssignmentUseCase.assign(taskId, request.userId(), userId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(toAssignmentResponse(assignment), "User assigned to task"));
    }

    @DeleteMapping("/{taskId}/assignments/{assigneeId}")
    @Operation(summary = "Unassign a user from a task")
    public ResponseEntity<Void> unassignUser(
            @CurrentUser UUID userId,
            @PathVariable UUID taskId,
            @PathVariable UUID assigneeId) {

        manageTaskAssignmentUseCase.unassign(taskId, assigneeId, userId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{taskId}/assignments")
    @Operation(summary = "List all assignments for a task")
    public ResponseEntity<ApiResponse<List<TaskAssignmentResponse>>> getAssignments(
            @PathVariable UUID taskId) {

        List<TaskAssignment> assignments = manageTaskAssignmentUseCase.getAssignmentsByTask(taskId);

        List<TaskAssignmentResponse> responses = assignments.stream()
                .map(this::toAssignmentResponse)
                .toList();

        return ResponseEntity.ok(ApiResponse.success(responses));
    }

    // ── Private helpers ──

    private TaskResponse toResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority().name(),
                task.getStatus().name(),
                task.getCategory().name(),
                task.getScheduledDate(),
                task.getScheduledTime(),
                task.getDueDate(),
                task.getEstimatedHours(),
                task.getDisplayOrder(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }

    private TaskDetailResponse toDetailResponse(Task task, List<Subtask> subtasks) {
        List<SubtaskResponse> subtaskResponses = subtasks.stream()
                .map(this::toSubtaskResponse)
                .toList();

        return new TaskDetailResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority().name(),
                task.getStatus().name(),
                task.getCategory().name(),
                task.getScheduledDate(),
                task.getScheduledTime(),
                task.getDueDate(),
                task.getEstimatedHours(),
                task.getDisplayOrder(),
                task.getCreatedAt(),
                task.getUpdatedAt(),
                subtaskResponses
        );
    }

    private SubtaskResponse toSubtaskResponse(Subtask subtask) {
        return new SubtaskResponse(
                subtask.getId(),
                subtask.getTitle(),
                subtask.isCompleted(),
                subtask.getDisplayOrder(),
                subtask.getCreatedAt()
        );
    }

    private TaskAssignmentResponse toAssignmentResponse(TaskAssignment assignment) {
        return new TaskAssignmentResponse(
                assignment.getId(),
                assignment.getTaskId(),
                assignment.getUserId(),
                assignment.getAssignedAt()
        );
    }

    private <E extends Enum<E>> E parseEnum(Class<E> enumClass, String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return Enum.valueOf(enumClass, value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(
                    "Invalid " + enumClass.getSimpleName() + ": " + value);
        }
    }
}
