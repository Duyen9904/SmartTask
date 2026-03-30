package com.dev.smarttask.task.adapter.out.persistence;

import com.dev.smarttask.task.adapter.out.persistence.entity.SubtaskJpaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaSubtaskRepository extends JpaRepository<SubtaskJpaEntity, UUID> {

    List<SubtaskJpaEntity> findAllByParentTaskIdOrderByDisplayOrder(UUID parentTaskId);
}
