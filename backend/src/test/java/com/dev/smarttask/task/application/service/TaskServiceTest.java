package com.dev.smarttask.task.application.service;

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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("TaskService")
class TaskServiceTest {

    @Mock
    private TaskRepositoryPort taskRepository;

    @Mock
    private SubtaskRepositoryPort subtaskRepository;

    @Mock
    private TaskAssignmentRepositoryPort taskAssignmentRepository;

    @InjectMocks
    private TaskService taskService;

    private UUID userId;
    private UUID taskId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        taskId = UUID.randomUUID();
    }

    private Task buildTask() {
        return Task.builder()
                .id(taskId)
                .userId(userId)
                .title("Test Task")
                .description("Description")
                .priority(Priority.MEDIUM)
                .status(TaskStatus.PENDING)
                .category(Category.PERSONAL)
                .build();
    }

    // ── CreateTaskUseCase ──

    @Nested
    @DisplayName("create()")
    class CreateTests {

        @Test
        @DisplayName("creates task with provided fields")
        void createTask_success() {
            CreateTaskCommand command = new CreateTaskCommand(
                    userId, "New Task", "Desc", Priority.HIGH, Category.WORK,
                    LocalDate.of(2026, 4, 1), null, null, BigDecimal.valueOf(2.5)
            );

            when(taskRepository.save(any(Task.class))).thenAnswer(inv -> {
                Task t = inv.getArgument(0);
                t.setId(taskId);
                return t;
            });

            Task result = taskService.create(command);

            assertAll(
                    () -> assertEquals("New Task", result.getTitle()),
                    () -> assertEquals(Priority.HIGH, result.getPriority()),
                    () -> assertEquals(Category.WORK, result.getCategory()),
                    () -> assertEquals(TaskStatus.PENDING, result.getStatus()),
                    () -> assertEquals(userId, result.getUserId())
            );

            verify(taskRepository).save(any(Task.class));
        }

        @Test
        @DisplayName("applies default priority MEDIUM when null")
        void createTask_defaultPriority() {
            CreateTaskCommand command = new CreateTaskCommand(
                    userId, "Task", null, null, null,
                    null, null, null, null
            );

            when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

            Task result = taskService.create(command);

            assertEquals(Priority.MEDIUM, result.getPriority());
        }

        @Test
        @DisplayName("applies default category PERSONAL when null")
        void createTask_defaultCategory() {
            CreateTaskCommand command = new CreateTaskCommand(
                    userId, "Task", null, null, null,
                    null, null, null, null
            );

            when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

            Task result = taskService.create(command);

            assertEquals(Category.PERSONAL, result.getCategory());
        }
    }

    // ── GetTaskUseCase ──

    @Nested
    @DisplayName("getById()")
    class GetByIdTests {

        @Test
        @DisplayName("returns task when found and owned")
        void getById_success() {
            Task task = buildTask();
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

            Task result = taskService.getById(taskId, userId);

            assertEquals(taskId, result.getId());
        }

        @Test
        @DisplayName("throws TaskNotFoundException when not found")
        void getById_notFound() {
            when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

            assertThrows(TaskNotFoundException.class,
                    () -> taskService.getById(taskId, userId));
        }

        @Test
        @DisplayName("throws TaskNotFoundException when wrong owner")
        void getById_wrongOwner() {
            Task task = buildTask();
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

            UUID otherUser = UUID.randomUUID();
            assertThrows(TaskNotFoundException.class,
                    () -> taskService.getById(taskId, otherUser));
        }
    }

    @Nested
    @DisplayName("getAllByUser()")
    class GetAllByUserTests {

        @Test
        @DisplayName("returns list of user's tasks")
        void getAllByUser_returnsList() {
            List<Task> tasks = List.of(buildTask());
            when(taskRepository.findAllByUserId(userId)).thenReturn(tasks);

            List<Task> result = taskService.getAllByUser(userId);

            assertEquals(1, result.size());
            verify(taskRepository).findAllByUserId(userId);
        }
    }

    @Nested
    @DisplayName("getByUserAndStatus()")
    class GetByStatusTests {

        @Test
        @DisplayName("filters tasks by status")
        void getByUserAndStatus_filterWorks() {
            when(taskRepository.findAllByUserIdAndStatus(userId, TaskStatus.COMPLETED))
                    .thenReturn(List.of());

            List<Task> result = taskService.getByUserAndStatus(userId, TaskStatus.COMPLETED);

            assertTrue(result.isEmpty());
            verify(taskRepository).findAllByUserIdAndStatus(userId, TaskStatus.COMPLETED);
        }
    }

    // ── UpdateTaskUseCase ──

    @Nested
    @DisplayName("update()")
    class UpdateTests {

        @Test
        @DisplayName("updates only non-null fields")
        void updateTask_partialUpdate() {
            Task task = buildTask();
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));
            when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

            UpdateTaskCommand command = new UpdateTaskCommand(
                    userId, "Updated Title", null, Priority.CRITICAL,
                    null, null, null, null, null, null, null
            );

            Task result = taskService.update(taskId, command);

            assertAll(
                    () -> assertEquals("Updated Title", result.getTitle()),
                    () -> assertEquals("Description", result.getDescription()), // unchanged
                    () -> assertEquals(Priority.CRITICAL, result.getPriority()),
                    () -> assertEquals(TaskStatus.PENDING, result.getStatus()) // unchanged
            );
        }

        @Test
        @DisplayName("throws when task not found")
        void updateTask_notFound() {
            when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

            UpdateTaskCommand command = new UpdateTaskCommand(
                    userId, "Title", null, null, null, null,
                    null, null, null, null, null
            );

            assertThrows(TaskNotFoundException.class,
                    () -> taskService.update(taskId, command));
        }

        @Test
        @DisplayName("throws when wrong owner")
        void updateTask_wrongOwner() {
            Task task = buildTask();
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

            UUID otherUser = UUID.randomUUID();
            UpdateTaskCommand command = new UpdateTaskCommand(
                    otherUser, "Title", null, null, null, null,
                    null, null, null, null, null
            );

            assertThrows(TaskNotFoundException.class,
                    () -> taskService.update(taskId, command));
        }
    }

    // ── DeleteTaskUseCase ──

    @Nested
    @DisplayName("softDelete()")
    class DeleteTests {

        @Test
        @DisplayName("sets deletedAt and saves")
        void softDelete_setsDeletedAt() {
            Task task = buildTask();
            assertNull(task.getDeletedAt());

            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));
            when(taskRepository.save(any(Task.class))).thenAnswer(inv -> inv.getArgument(0));

            taskService.softDelete(taskId, userId);

            ArgumentCaptor<Task> captor = ArgumentCaptor.forClass(Task.class);
            verify(taskRepository).save(captor.capture());
            assertNotNull(captor.getValue().getDeletedAt());
        }

        @Test
        @DisplayName("throws when task not found")
        void softDelete_notFound() {
            when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

            assertThrows(TaskNotFoundException.class,
                    () -> taskService.softDelete(taskId, userId));
        }

        @Test
        @DisplayName("throws when wrong owner")
        void softDelete_wrongOwner() {
            Task task = buildTask();
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

            UUID otherUser = UUID.randomUUID();
            assertThrows(TaskNotFoundException.class,
                    () -> taskService.softDelete(taskId, otherUser));
        }
    }

    // ── ManageSubtaskUseCase ──

    @Nested
    @DisplayName("Subtask operations")
    class SubtaskTests {

        @Test
        @DisplayName("addSubtask creates subtask linked to parent with ownership check")
        void addSubtask_success() {
            Task parentTask = buildTask();
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(parentTask));

            UUID subtaskId = UUID.randomUUID();
            when(subtaskRepository.save(any(Subtask.class))).thenAnswer(inv -> {
                Subtask s = inv.getArgument(0);
                s.setId(subtaskId);
                return s;
            });

            CreateSubtaskCommand command = new CreateSubtaskCommand("Sub 1", 0);
            Subtask result = taskService.addSubtask(taskId, userId, command);

            assertAll(
                    () -> assertEquals("Sub 1", result.getTitle()),
                    () -> assertEquals(taskId, result.getParentTaskId()),
                    () -> assertFalse(result.isCompleted())
            );
        }

        @Test
        @DisplayName("addSubtask throws when wrong owner")
        void addSubtask_wrongOwner() {
            Task parentTask = buildTask();
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(parentTask));

            UUID otherUser = UUID.randomUUID();
            CreateSubtaskCommand command = new CreateSubtaskCommand("Sub 1", 0);

            assertThrows(TaskNotFoundException.class,
                    () -> taskService.addSubtask(taskId, otherUser, command));
        }

        @Test
        @DisplayName("addSubtask throws when parent not found")
        void addSubtask_parentNotFound() {
            when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

            CreateSubtaskCommand command = new CreateSubtaskCommand("Sub 1", 0);

            assertThrows(TaskNotFoundException.class,
                    () -> taskService.addSubtask(taskId, userId, command));
        }

        @Test
        @DisplayName("toggleCompletion flips boolean with ownership check")
        void toggleCompletion_flips() {
            UUID subtaskId = UUID.randomUUID();
            Subtask subtask = Subtask.builder()
                    .id(subtaskId)
                    .parentTaskId(taskId)
                    .title("Sub")
                    .isCompleted(false)
                    .build();

            Task parentTask = buildTask();
            when(subtaskRepository.findById(subtaskId)).thenReturn(Optional.of(subtask));
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(parentTask));
            when(subtaskRepository.save(any(Subtask.class))).thenAnswer(inv -> inv.getArgument(0));

            Subtask result = taskService.toggleCompletion(subtaskId, userId);

            assertTrue(result.isCompleted());
        }

        @Test
        @DisplayName("toggleCompletion throws SubtaskNotFoundException when not found")
        void toggleCompletion_notFound() {
            UUID subtaskId = UUID.randomUUID();
            when(subtaskRepository.findById(subtaskId)).thenReturn(Optional.empty());

            assertThrows(SubtaskNotFoundException.class,
                    () -> taskService.toggleCompletion(subtaskId, userId));
        }

        @Test
        @DisplayName("deleteSubtask verifies ownership before deleting")
        void deleteSubtask_success() {
            UUID subtaskId = UUID.randomUUID();
            Subtask subtask = Subtask.builder()
                    .id(subtaskId)
                    .parentTaskId(taskId)
                    .title("Sub")
                    .build();

            Task parentTask = buildTask();
            when(subtaskRepository.findById(subtaskId)).thenReturn(Optional.of(subtask));
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(parentTask));

            taskService.deleteSubtask(subtaskId, userId);

            verify(subtaskRepository).deleteById(subtaskId);
        }

        @Test
        @DisplayName("deleteSubtask throws SubtaskNotFoundException when not found")
        void deleteSubtask_notFound() {
            UUID subtaskId = UUID.randomUUID();
            when(subtaskRepository.findById(subtaskId)).thenReturn(Optional.empty());

            assertThrows(SubtaskNotFoundException.class,
                    () -> taskService.deleteSubtask(subtaskId, userId));
        }

        @Test
        @DisplayName("getSubtasksByTask returns list")
        void getSubtasksByTask_returnsList() {
            Subtask sub = Subtask.builder().id(UUID.randomUUID()).parentTaskId(taskId).title("S").build();
            when(subtaskRepository.findAllByParentTaskId(taskId)).thenReturn(List.of(sub));

            List<Subtask> result = taskService.getSubtasksByTask(taskId);

            assertEquals(1, result.size());
        }
    }

    // ── ManageTaskAssignmentUseCase ──

    @Nested
    @DisplayName("Task assignment operations")
    class AssignmentTests {

        @Test
        @DisplayName("assign creates assignment when user is owner")
        void assign_success() {
            Task task = buildTask();
            UUID assigneeId = UUID.randomUUID();

            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));
            when(taskAssignmentRepository.existsByTaskIdAndUserId(taskId, assigneeId)).thenReturn(false);
            when(taskAssignmentRepository.save(any(TaskAssignment.class))).thenAnswer(inv -> {
                TaskAssignment a = inv.getArgument(0);
                a.setId(UUID.randomUUID());
                return a;
            });

            TaskAssignment result = taskService.assign(taskId, assigneeId, userId);

            assertAll(
                    () -> assertEquals(taskId, result.getTaskId()),
                    () -> assertEquals(assigneeId, result.getUserId()),
                    () -> assertNotNull(result.getAssignedAt())
            );

            verify(taskAssignmentRepository).save(any(TaskAssignment.class));
        }

        @Test
        @DisplayName("assign throws when task not found")
        void assign_taskNotFound() {
            when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

            assertThrows(TaskNotFoundException.class,
                    () -> taskService.assign(taskId, UUID.randomUUID(), userId));
        }

        @Test
        @DisplayName("assign throws when not task owner")
        void assign_notOwner() {
            Task task = buildTask();
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

            UUID otherUser = UUID.randomUUID();
            assertThrows(TaskNotFoundException.class,
                    () -> taskService.assign(taskId, UUID.randomUUID(), otherUser));
        }

        @Test
        @DisplayName("assign throws when already assigned")
        void assign_alreadyAssigned() {
            Task task = buildTask();
            UUID assigneeId = UUID.randomUUID();

            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));
            when(taskAssignmentRepository.existsByTaskIdAndUserId(taskId, assigneeId)).thenReturn(true);

            assertThrows(IllegalArgumentException.class,
                    () -> taskService.assign(taskId, assigneeId, userId));
        }

        @Test
        @DisplayName("unassign removes assignment when owner")
        void unassign_success() {
            Task task = buildTask();
            UUID assigneeId = UUID.randomUUID();

            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

            taskService.unassign(taskId, assigneeId, userId);

            verify(taskAssignmentRepository).deleteByTaskIdAndUserId(taskId, assigneeId);
        }

        @Test
        @DisplayName("unassign throws when not owner")
        void unassign_notOwner() {
            Task task = buildTask();
            when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

            UUID otherUser = UUID.randomUUID();
            assertThrows(TaskNotFoundException.class,
                    () -> taskService.unassign(taskId, UUID.randomUUID(), otherUser));
        }

        @Test
        @DisplayName("getAssignmentsByTask returns list")
        void getAssignments_returnsList() {
            TaskAssignment assignment = TaskAssignment.builder()
                    .id(UUID.randomUUID()).taskId(taskId).userId(UUID.randomUUID()).build();
            when(taskAssignmentRepository.findAllByTaskId(taskId)).thenReturn(List.of(assignment));

            List<TaskAssignment> result = taskService.getAssignmentsByTask(taskId);

            assertEquals(1, result.size());
        }
    }
}
