package com.dev.smarttask.task.adapter.out.persistence;

import com.dev.smarttask.task.adapter.out.persistence.mapper.TaskPersistenceMapper;
import com.dev.smarttask.task.application.port.out.TaskAssignmentRepositoryPort;
import com.dev.smarttask.task.domain.model.TaskAssignment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TaskAssignmentRepositoryAdapter implements TaskAssignmentRepositoryPort {

    private final JpaTaskAssignmentRepository jpaTaskAssignmentRepository;
    private final TaskPersistenceMapper mapper;

    @Override
    public TaskAssignment save(TaskAssignment assignment) {
        var entity = mapper.toJpaEntity(assignment);
        var saved = jpaTaskAssignmentRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public List<TaskAssignment> findAllByTaskId(UUID taskId) {
        return jpaTaskAssignmentRepository.findAllByTaskId(taskId)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public List<TaskAssignment> findAllByUserId(UUID userId) {
        return jpaTaskAssignmentRepository.findAllByUserId(userId)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public boolean existsByTaskIdAndUserId(UUID taskId, UUID userId) {
        return jpaTaskAssignmentRepository.existsByTaskIdAndUserId(taskId, userId);
    }

    @Override
    public void deleteByTaskIdAndUserId(UUID taskId, UUID userId) {
        jpaTaskAssignmentRepository.deleteByTaskIdAndUserId(taskId, userId);
    }
}
