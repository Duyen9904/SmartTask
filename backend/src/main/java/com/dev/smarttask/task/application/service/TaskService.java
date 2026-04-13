package com.dev.smarttask.task.application.service;

import com.dev.smarttask.task.application.port.in.CreateTaskUseCase;
import com.dev.smarttask.task.application.port.in.DeleteTaskUseCase;
import com.dev.smarttask.task.application.port.in.GetTaskUseCase;
import com.dev.smarttask.task.application.port.in.ManageSubtaskUseCase;
import com.dev.smarttask.task.application.port.in.ManageTaskAssignmentUseCase;
import com.dev.smarttask.task.application.port.in.UpdateTaskUseCase;
import com.dev.smarttask.task.application.port.in.command.CreateSubtaskCommand;
import com.dev.smarttask.task.application.port.in.command.CreateTaskCommand;
import com.dev.smarttask.task.application.port.in.command.UpdateTaskCommand;
import com.dev.smarttask.task.application.port.out.SubtaskRepositoryPort;
import com.dev.smarttask.task.application.port.out.TaskAssignmentRepositoryPort;
import com.dev.smarttask.task.application.port.out.TaskRepositoryPort;
import com.dev.smarttask.task.domain.exception.SubtaskNotFoundException;
import com.dev.smarttask.task.domain.exception.TaskNotFoundException;
import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import com.dev.smarttask.task.domain.model.Subtask;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.task.domain.model.TaskAssignment;
import com.dev.smarttask.task.domain.model.TaskStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class TaskService implements CreateTaskUseCase, GetTaskUseCase,
        UpdateTaskUseCase, DeleteTaskUseCase, ManageSubtaskUseCase, ManageTaskAssignmentUseCase {

    private final TaskRepositoryPort taskRepository;
    private final SubtaskRepositoryPort subtaskRepository;
    private final TaskAssignmentRepositoryPort taskAssignmentRepository;

    // ── CreateTaskUseCase ──

    @Override
    public Task create(CreateTaskCommand command) {
        Task task = Task.builder()
                .userId(command.userId())
                .title(command.title())
                .description(command.description())
                .priority(command.priority() != null ? command.priority() : Priority.MEDIUM)
                .status(TaskStatus.PENDING)
                .category(command.category() != null ? command.category() : Category.PERSONAL)
                .scheduledDate(command.scheduledDate())
                .scheduledTime(command.scheduledTime())
                .dueDate(command.dueDate())
                .estimatedHours(command.estimatedHours())
                .build();

        Task saved = taskRepository.save(task);
        log.info("Task created: id={}, title='{}', user={}", saved.getId(), saved.getTitle(), saved.getUserId());
        return saved;
    }

    @Override
    public List<Task> copyTasks(UUID userId, LocalDate sourceDate, LocalDate targetDate) {
        List<Task> sourceTasks = taskRepository.findAllByDate(userId, sourceDate);
        List<Task> copiedTasks = new java.util.ArrayList<>();
        
        for (Task task : sourceTasks) {
            Task copied = Task.builder()
                    .userId(userId)
                    .title(task.getTitle())
                    .description(task.getDescription())
                    .priority(task.getPriority())
                    .status(TaskStatus.PENDING)
                    .category(task.getCategory())
                    .scheduledDate(targetDate)
                    .scheduledTime(task.getScheduledTime())
                    .dueDate(targetDate)
                    .estimatedHours(task.getEstimatedHours())
                    .parentTemplateId(null) // just to be explicit
                    .displayOrder(task.getDisplayOrder())
                    .build();
            copiedTasks.add(taskRepository.save(copied));
        }
        
        return copiedTasks;
    }

    // ── GetTaskUseCase ──

    @Override
    @Transactional(readOnly = true)
    public Task getById(UUID taskId, UUID userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!task.getUserId().equals(userId)) {
            throw new TaskNotFoundException(taskId);
        }

        return task;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> getAllByUser(UUID userId) {
        return taskRepository.findAllByUserId(userId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> getByUserAndStatus(UUID userId, TaskStatus status) {
        return taskRepository.findAllByUserIdAndStatus(userId, status);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Task> getAllByUser(UUID userId, Pageable pageable) {
        return taskRepository.findAllByUserId(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Task> searchTasks(UUID userId, TaskStatus status, Priority priority,
                                   Category category, LocalDate fromDate, LocalDate toDate,
                                   String keyword, Pageable pageable) {
        return taskRepository.findByFilters(userId, status, priority, category,
                fromDate, toDate, keyword, pageable);
    }

    // ── UpdateTaskUseCase ──

    @Override
    public Task update(UUID taskId, UpdateTaskCommand command) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!task.getUserId().equals(command.userId())) {
            throw new TaskNotFoundException(taskId);
        }

        // Partial update: only overwrite non-null fields
        if (command.title() != null) {
            task.setTitle(command.title());
        }
        if (command.description() != null) {
            task.setDescription(command.description());
        }
        if (command.priority() != null) {
            task.setPriority(command.priority());
        }
        if (command.status() != null) {
            task.setStatus(command.status());
        }
        if (command.category() != null) {
            task.setCategory(command.category());
        }
        if (command.scheduledDate() != null) {
            task.setScheduledDate(command.scheduledDate());
        }
        if (command.scheduledTime() != null) {
            task.setScheduledTime(command.scheduledTime());
        }
        if (command.dueDate() != null) {
            task.setDueDate(command.dueDate());
        }
        if (command.estimatedHours() != null) {
            task.setEstimatedHours(command.estimatedHours());
        }
        if (command.displayOrder() != null) {
            task.setDisplayOrder(command.displayOrder());
        }

        Task updated = taskRepository.save(task);
        log.info("Task updated: id={}", updated.getId());
        return updated;
    }

    // ── DeleteTaskUseCase ──

    @Override
    public void softDelete(UUID taskId, UUID userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!task.getUserId().equals(userId)) {
            throw new TaskNotFoundException(taskId);
        }

        task.setDeletedAt(LocalDateTime.now());
        taskRepository.save(task);
        log.info("Task soft-deleted: id={}", taskId);
    }

    // ── ManageSubtaskUseCase ──

    @Override
    public Subtask addSubtask(UUID parentTaskId, UUID userId, CreateSubtaskCommand command) {
        Task parentTask = taskRepository.findById(parentTaskId)
                .orElseThrow(() -> new TaskNotFoundException(parentTaskId));

        if (!parentTask.getUserId().equals(userId)) {
            throw new TaskNotFoundException(parentTaskId);
        }

        Subtask subtask = Subtask.builder()
                .parentTaskId(parentTaskId)
                .title(command.title())
                .displayOrder(command.displayOrder())
                .build();

        Subtask saved = subtaskRepository.save(subtask);
        log.info("Subtask added: id={}, parentTask={}", saved.getId(), parentTaskId);
        return saved;
    }

    @Override
    public Subtask toggleCompletion(UUID subtaskId, UUID userId) {
        Subtask subtask = subtaskRepository.findById(subtaskId)
                .orElseThrow(() -> new SubtaskNotFoundException(subtaskId));

        // Verify ownership via parent task
        Task parentTask = taskRepository.findById(subtask.getParentTaskId())
                .orElseThrow(() -> new TaskNotFoundException(subtask.getParentTaskId()));

        if (!parentTask.getUserId().equals(userId)) {
            throw new TaskNotFoundException(parentTask.getId());
        }

        subtask.setCompleted(!subtask.isCompleted());

        Subtask updated = subtaskRepository.save(subtask);
        log.info("Subtask toggled: id={}, completed={}", subtaskId, updated.isCompleted());
        return updated;
    }

    @Override
    public void deleteSubtask(UUID subtaskId, UUID userId) {
        Subtask subtask = subtaskRepository.findById(subtaskId)
                .orElseThrow(() -> new SubtaskNotFoundException(subtaskId));

        // Verify ownership via parent task
        Task parentTask = taskRepository.findById(subtask.getParentTaskId())
                .orElseThrow(() -> new TaskNotFoundException(subtask.getParentTaskId()));

        if (!parentTask.getUserId().equals(userId)) {
            throw new TaskNotFoundException(parentTask.getId());
        }

        subtaskRepository.deleteById(subtaskId);
        log.info("Subtask deleted: id={}", subtaskId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Subtask> getSubtasksByTask(UUID parentTaskId) {
        return subtaskRepository.findAllByParentTaskId(parentTaskId);
    }

    // ── ManageTaskAssignmentUseCase ──

    @Override
    public TaskAssignment assign(UUID taskId, UUID assigneeUserId, UUID requestingUserId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!task.getUserId().equals(requestingUserId)) {
            throw new TaskNotFoundException(taskId);
        }

        if (taskAssignmentRepository.existsByTaskIdAndUserId(taskId, assigneeUserId)) {
            throw new IllegalArgumentException("User is already assigned to this task");
        }

        TaskAssignment assignment = TaskAssignment.builder()
                .taskId(taskId)
                .userId(assigneeUserId)
                .assignedAt(LocalDateTime.now())
                .build();

        TaskAssignment saved = taskAssignmentRepository.save(assignment);
        log.info("Task assigned: taskId={}, userId={}", taskId, assigneeUserId);
        return saved;
    }

    @Override
    public void unassign(UUID taskId, UUID assigneeUserId, UUID requestingUserId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        if (!task.getUserId().equals(requestingUserId)) {
            throw new TaskNotFoundException(taskId);
        }

        taskAssignmentRepository.deleteByTaskIdAndUserId(taskId, assigneeUserId);
        log.info("Task unassigned: taskId={}, userId={}", taskId, assigneeUserId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TaskAssignment> getAssignmentsByTask(UUID taskId) {
        return taskAssignmentRepository.findAllByTaskId(taskId);
    }
}
