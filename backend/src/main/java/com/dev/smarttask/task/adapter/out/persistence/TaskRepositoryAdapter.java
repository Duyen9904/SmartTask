package com.dev.smarttask.task.adapter.out.persistence;

import com.dev.smarttask.task.adapter.out.persistence.mapper.TaskPersistenceMapper;
import com.dev.smarttask.task.application.port.out.TaskRepositoryPort;
import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.task.domain.model.TaskStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TaskRepositoryAdapter implements TaskRepositoryPort {

    private final JpaTaskRepository jpaTaskRepository;
    private final TaskPersistenceMapper mapper;

    @Override
    public Task save(Task task) {
        var entity = mapper.toJpaEntity(task);
        var saved = jpaTaskRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<Task> findById(UUID id) {
        return jpaTaskRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<Task> findAllByUserId(UUID userId) {
        return jpaTaskRepository.findAllByUserIdAndDeletedAtIsNullOrderByDisplayOrder(userId)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public List<Task> findAllByUserIdAndStatus(UUID userId, TaskStatus status) {
        return jpaTaskRepository.findAllByUserIdAndStatusAndDeletedAtIsNull(userId, status)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public Page<Task> findAllByUserId(UUID userId, Pageable pageable) {
        return jpaTaskRepository.findAllByUserIdAndDeletedAtIsNullOrderByDisplayOrder(userId, pageable)
                .map(mapper::toDomain);
    }

    @Override
    public Page<Task> findByFilters(UUID userId, TaskStatus status, Priority priority,
                                     Category category, LocalDate fromDate, LocalDate toDate,
                                     String keyword, Pageable pageable) {
        return jpaTaskRepository.findByFilters(userId, status, priority, category,
                        fromDate, toDate, keyword, pageable)
                .map(mapper::toDomain);
    }

    @Override
    public void deleteById(UUID id) {
        jpaTaskRepository.deleteById(id);
    }
}
