package com.dev.smarttask.task.application.port.out;

import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.task.domain.model.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskRepositoryPort {

    Task save(Task task);

    Optional<Task> findById(UUID id);

    List<Task> findAllByUserId(UUID userId);

    List<Task> findAllByUserIdAndStatus(UUID userId, TaskStatus status);

    Page<Task> findAllByUserId(UUID userId, Pageable pageable);

    Page<Task> findByFilters(UUID userId, TaskStatus status, Priority priority,
                             Category category, LocalDate fromDate, LocalDate toDate,
                             String keyword, Pageable pageable);

    void deleteById(UUID id);

    List<Task> findBlueprintsByTemplateId(UUID templateId);

    List<Task> findAllByDate(UUID userId, LocalDate date);
}
