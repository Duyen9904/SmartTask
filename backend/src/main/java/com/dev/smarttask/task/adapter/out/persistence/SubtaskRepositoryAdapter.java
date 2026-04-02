package com.dev.smarttask.task.adapter.out.persistence;

import com.dev.smarttask.task.adapter.out.persistence.mapper.TaskPersistenceMapper;
import com.dev.smarttask.task.application.port.out.SubtaskRepositoryPort;
import com.dev.smarttask.task.domain.model.Subtask;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class SubtaskRepositoryAdapter implements SubtaskRepositoryPort {

    private final JpaSubtaskRepository jpaSubtaskRepository;
    private final TaskPersistenceMapper mapper;

    @Override
    public Subtask save(Subtask subtask) {
        var entity = mapper.toJpaEntity(subtask);
        var saved = jpaSubtaskRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<Subtask> findById(UUID id) {
        return jpaSubtaskRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<Subtask> findAllByParentTaskId(UUID parentTaskId) {
        return jpaSubtaskRepository.findAllByParentTaskIdOrderByDisplayOrder(parentTaskId)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public void deleteById(UUID id) {
        jpaSubtaskRepository.deleteById(id);
    }
}
