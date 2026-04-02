package com.dev.smarttask.task.application.port.in;

import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.task.domain.model.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface GetTaskUseCase {

    Task getById(UUID taskId, UUID userId);

    List<Task> getAllByUser(UUID userId);

    List<Task> getByUserAndStatus(UUID userId, TaskStatus status);

    Page<Task> getAllByUser(UUID userId, Pageable pageable);

    Page<Task> searchTasks(UUID userId, TaskStatus status, Priority priority,
                           Category category, LocalDate fromDate, LocalDate toDate,
                           String keyword, Pageable pageable);
}
