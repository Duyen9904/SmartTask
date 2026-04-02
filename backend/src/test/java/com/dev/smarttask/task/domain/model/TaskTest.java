package com.dev.smarttask.task.domain.model;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Task Domain Model")
class TaskTest {

    @Test
    @DisplayName("Builder default priority is MEDIUM")
    void builder_defaultPriority_isMedium() {
        Task task = Task.builder().build();
        assertEquals(Priority.MEDIUM, task.getPriority());
    }

    @Test
    @DisplayName("Builder default status is PENDING")
    void builder_defaultStatus_isPending() {
        Task task = Task.builder().build();
        assertEquals(TaskStatus.PENDING, task.getStatus());
    }

    @Test
    @DisplayName("Builder default category is PERSONAL")
    void builder_defaultCategory_isPersonal() {
        Task task = Task.builder().build();
        assertEquals(Category.PERSONAL, task.getCategory());
    }

    @Test
    @DisplayName("Builder default displayOrder is 0")
    void builder_defaultDisplayOrder_isZero() {
        Task task = Task.builder().build();
        assertEquals(0, task.getDisplayOrder());
    }

    @Test
    @DisplayName("Builder sets all fields correctly")
    void builder_setsAllFields() {
        var id = java.util.UUID.randomUUID();
        var userId = java.util.UUID.randomUUID();

        Task task = Task.builder()
                .id(id)
                .userId(userId)
                .title("Test Task")
                .description("A description")
                .priority(Priority.HIGH)
                .status(TaskStatus.IN_PROGRESS)
                .category(Category.WORK)
                .displayOrder(5)
                .build();

        assertAll(
                () -> assertEquals(id, task.getId()),
                () -> assertEquals(userId, task.getUserId()),
                () -> assertEquals("Test Task", task.getTitle()),
                () -> assertEquals("A description", task.getDescription()),
                () -> assertEquals(Priority.HIGH, task.getPriority()),
                () -> assertEquals(TaskStatus.IN_PROGRESS, task.getStatus()),
                () -> assertEquals(Category.WORK, task.getCategory()),
                () -> assertEquals(5, task.getDisplayOrder())
        );
    }
}
