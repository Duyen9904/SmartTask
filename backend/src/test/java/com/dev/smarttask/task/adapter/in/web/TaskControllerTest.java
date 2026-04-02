package com.dev.smarttask.task.adapter.in.web;

import com.dev.smarttask.task.application.port.in.CreateTaskUseCase;
import com.dev.smarttask.task.application.port.in.DeleteTaskUseCase;
import com.dev.smarttask.task.application.port.in.GetTaskUseCase;
import com.dev.smarttask.task.application.port.in.ManageSubtaskUseCase;
import com.dev.smarttask.task.application.port.in.ManageTaskAssignmentUseCase;
import com.dev.smarttask.task.application.port.in.UpdateTaskUseCase;
import com.dev.smarttask.task.domain.exception.TaskNotFoundException;
import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import com.dev.smarttask.task.domain.model.Subtask;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.task.domain.model.TaskAssignment;
import com.dev.smarttask.task.domain.model.TaskStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.security.autoconfigure.servlet.SecurityAutoConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
        controllers = TaskController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class,
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.REGEX,
                pattern = "com\\.dev\\.smarttask\\.common\\.adapter\\.in\\.web\\..*"
        )
)
@DisplayName("TaskController")
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private CreateTaskUseCase createTaskUseCase;

    @MockitoBean
    private GetTaskUseCase getTaskUseCase;

    @MockitoBean
    private UpdateTaskUseCase updateTaskUseCase;

    @MockitoBean
    private DeleteTaskUseCase deleteTaskUseCase;

    @MockitoBean
    private ManageSubtaskUseCase manageSubtaskUseCase;

    @MockitoBean
    private ManageTaskAssignmentUseCase manageTaskAssignmentUseCase;

    private final UUID taskId = UUID.randomUUID();
    private final UUID userId = UUID.randomUUID();

    private Task buildTask() {
        return Task.builder()
                .id(taskId)
                .userId(userId)
                .title("Test Task")
                .description("Description")
                .priority(Priority.HIGH)
                .status(TaskStatus.PENDING)
                .category(Category.WORK)
                .scheduledDate(LocalDate.of(2026, 4, 1))
                .estimatedHours(BigDecimal.valueOf(2.0))
                .displayOrder(0)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    // ── POST /api/v1/tasks ──

    @Nested
    @DisplayName("POST /api/v1/tasks")
    class CreateTaskTests {

        @Test
        @DisplayName("201 — creates task with valid body")
        void createTask_201() throws Exception {
            Task task = buildTask();
            when(createTaskUseCase.create(any())).thenReturn(task);

            String body = """
                    {
                        "title": "Test Task",
                        "description": "Description",
                        "priority": "HIGH",
                        "category": "WORK"
                    }
                    """;

            mockMvc.perform(post("/api/v1/tasks")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(body))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.title").value("Test Task"))
                    .andExpect(jsonPath("$.data.priority").value("HIGH"));
        }

        @Test
        @DisplayName("400 — blank title returns validation error")
        void createTask_400_blankTitle() throws Exception {
            String body = """
                    {
                        "title": "",
                        "description": "Desc"
                    }
                    """;

            mockMvc.perform(post("/api/v1/tasks")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(body))
                    .andExpect(status().isBadRequest());
        }
    }

    // ── GET /api/v1/tasks ──

    @Nested
    @DisplayName("GET /api/v1/tasks")
    class GetTasksTests {

        @Test
        @DisplayName("200 — returns list of tasks")
        void getTasks_200() throws Exception {
            Task task = buildTask();
            when(getTaskUseCase.getAllByUser(any())).thenReturn(List.of(task));

            mockMvc.perform(get("/api/v1/tasks"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data").isArray())
                    .andExpect(jsonPath("$.data[0].title").value("Test Task"));
        }

        @Test
        @DisplayName("200 — filters by status param")
        void getTasks_200_withStatusFilter() throws Exception {
            when(getTaskUseCase.getByUserAndStatus(any(), eq(TaskStatus.COMPLETED)))
                    .thenReturn(List.of());

            mockMvc.perform(get("/api/v1/tasks").param("status", "COMPLETED"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data").isArray())
                    .andExpect(jsonPath("$.data").isEmpty());
        }
    }

    // ── GET /api/v1/tasks/{id} ──

    @Nested
    @DisplayName("GET /api/v1/tasks/{id}")
    class GetTaskByIdTests {

        @Test
        @DisplayName("200 — returns task with subtasks")
        void getTaskById_200() throws Exception {
            Task task = buildTask();
            Subtask subtask = Subtask.builder()
                    .id(UUID.randomUUID())
                    .parentTaskId(taskId)
                    .title("Subtask 1")
                    .isCompleted(false)
                    .displayOrder(0)
                    .createdAt(LocalDateTime.now())
                    .build();

            when(getTaskUseCase.getById(eq(taskId), any())).thenReturn(task);
            when(manageSubtaskUseCase.getSubtasksByTask(taskId)).thenReturn(List.of(subtask));

            mockMvc.perform(get("/api/v1/tasks/{taskId}", taskId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.title").value("Test Task"))
                    .andExpect(jsonPath("$.data.subtasks").isArray())
                    .andExpect(jsonPath("$.data.subtasks[0].title").value("Subtask 1"));
        }

        @Test
        @DisplayName("404 — task not found")
        void getTaskById_404() throws Exception {
            when(getTaskUseCase.getById(eq(taskId), any()))
                    .thenThrow(new TaskNotFoundException(taskId));

            mockMvc.perform(get("/api/v1/tasks/{taskId}", taskId))
                    .andExpect(status().isNotFound())
                    .andExpect(jsonPath("$.success").value(false));
        }
    }

    // ── PUT /api/v1/tasks/{id} ──

    @Nested
    @DisplayName("PUT /api/v1/tasks/{id}")
    class UpdateTaskTests {

        @Test
        @DisplayName("200 — updates task")
        void updateTask_200() throws Exception {
            Task updated = buildTask();
            updated.setTitle("Updated Title");
            when(updateTaskUseCase.update(eq(taskId), any())).thenReturn(updated);

            String body = """
                    {
                        "title": "Updated Title"
                    }
                    """;

            mockMvc.perform(put("/api/v1/tasks/{taskId}", taskId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(body))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.title").value("Updated Title"));
        }
    }

    // ── DELETE /api/v1/tasks/{id} ──

    @Nested
    @DisplayName("DELETE /api/v1/tasks/{id}")
    class DeleteTaskTests {

        @Test
        @DisplayName("204 — soft deletes task")
        void deleteTask_204() throws Exception {
            doNothing().when(deleteTaskUseCase).softDelete(eq(taskId), any());

            mockMvc.perform(delete("/api/v1/tasks/{taskId}", taskId))
                    .andExpect(status().isNoContent());
        }
    }

    // ── POST /api/v1/tasks/{id}/subtasks ──

    @Nested
    @DisplayName("POST /api/v1/tasks/{id}/subtasks")
    class AddSubtaskTests {

        @Test
        @DisplayName("201 — adds subtask")
        void addSubtask_201() throws Exception {
            Subtask subtask = Subtask.builder()
                    .id(UUID.randomUUID())
                    .parentTaskId(taskId)
                    .title("New Sub")
                    .isCompleted(false)
                    .displayOrder(0)
                    .createdAt(LocalDateTime.now())
                    .build();

            when(manageSubtaskUseCase.addSubtask(eq(taskId), any(), any())).thenReturn(subtask);

            String body = """
                    {
                        "title": "New Sub",
                        "displayOrder": 0
                    }
                    """;

            mockMvc.perform(post("/api/v1/tasks/{taskId}/subtasks", taskId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(body))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.data.title").value("New Sub"));
        }
    }

    // ── PATCH /api/v1/tasks/{id}/subtasks/{subId}/toggle ──

    @Nested
    @DisplayName("PATCH .../subtasks/{subId}/toggle")
    class ToggleSubtaskTests {

        @Test
        @DisplayName("200 — toggles subtask completion")
        void toggleSubtask_200() throws Exception {
            UUID subtaskId = UUID.randomUUID();
            Subtask toggled = Subtask.builder()
                    .id(subtaskId)
                    .parentTaskId(taskId)
                    .title("Sub")
                    .isCompleted(true)
                    .displayOrder(0)
                    .createdAt(LocalDateTime.now())
                    .build();

            when(manageSubtaskUseCase.toggleCompletion(eq(subtaskId), any())).thenReturn(toggled);

            mockMvc.perform(patch("/api/v1/tasks/{taskId}/subtasks/{subtaskId}/toggle",
                            taskId, subtaskId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data.isCompleted").value(true));
        }
    }

    // ── POST /api/v1/tasks/{id}/assignments ──

    @Nested
    @DisplayName("POST /api/v1/tasks/{id}/assignments")
    class AssignUserTests {

        @Test
        @DisplayName("201 — assigns user to task")
        void assignUser_201() throws Exception {
            UUID assigneeId = UUID.randomUUID();
            TaskAssignment assignment = TaskAssignment.builder()
                    .id(UUID.randomUUID())
                    .taskId(taskId)
                    .userId(assigneeId)
                    .assignedAt(LocalDateTime.now())
                    .build();

            when(manageTaskAssignmentUseCase.assign(eq(taskId), eq(assigneeId), any()))
                    .thenReturn(assignment);

            String body = String.format("""
                    {
                        "userId": "%s"
                    }
                    """, assigneeId);

            mockMvc.perform(post("/api/v1/tasks/{taskId}/assignments", taskId)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(body))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.data.taskId").value(taskId.toString()))
                    .andExpect(jsonPath("$.data.userId").value(assigneeId.toString()));
        }
    }

    // ── GET /api/v1/tasks/{id}/assignments ──

    @Nested
    @DisplayName("GET /api/v1/tasks/{id}/assignments")
    class GetAssignmentsTests {

        @Test
        @DisplayName("200 — returns assignments list")
        void getAssignments_200() throws Exception {
            TaskAssignment assignment = TaskAssignment.builder()
                    .id(UUID.randomUUID())
                    .taskId(taskId)
                    .userId(UUID.randomUUID())
                    .assignedAt(LocalDateTime.now())
                    .build();

            when(manageTaskAssignmentUseCase.getAssignmentsByTask(taskId))
                    .thenReturn(List.of(assignment));

            mockMvc.perform(get("/api/v1/tasks/{taskId}/assignments", taskId))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data").isArray())
                    .andExpect(jsonPath("$.data[0].taskId").value(taskId.toString()));
        }
    }
}
