package com.dev.smarttask.task.application.port.out;

import com.dev.smarttask.task.domain.model.Subtask;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SubtaskRepositoryPort {

    Subtask save(Subtask subtask);

    Optional<Subtask> findById(UUID id);

    List<Subtask> findAllByParentTaskId(UUID parentTaskId);

    void deleteById(UUID id);
}
