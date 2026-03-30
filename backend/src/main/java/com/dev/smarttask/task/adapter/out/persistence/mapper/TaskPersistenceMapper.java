package com.dev.smarttask.task.adapter.out.persistence.mapper;

import com.dev.smarttask.task.adapter.out.persistence.entity.SubtaskJpaEntity;
import com.dev.smarttask.task.adapter.out.persistence.entity.TaskAssignmentJpaEntity;
import com.dev.smarttask.task.adapter.out.persistence.entity.TaskJpaEntity;
import com.dev.smarttask.task.domain.model.Subtask;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.task.domain.model.TaskAssignment;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TaskPersistenceMapper {

    // Task mappings
    TaskJpaEntity toJpaEntity(Task task);
    Task toDomain(TaskJpaEntity entity);

    // TaskAssignment mappings
    TaskAssignmentJpaEntity toJpaEntity(TaskAssignment assignment);
    TaskAssignment toDomain(TaskAssignmentJpaEntity entity);

    // Subtask mappings
    SubtaskJpaEntity toJpaEntity(Subtask subtask);
    Subtask toDomain(SubtaskJpaEntity entity);
}
