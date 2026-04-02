package com.dev.smarttask.common.adapter.out.persistence;

import com.dev.smarttask.common.adapter.out.persistence.entity.AttachmentJpaEntity;
import com.dev.smarttask.common.domain.model.EntityType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaAttachmentRepository extends JpaRepository<AttachmentJpaEntity, UUID> {

    List<AttachmentJpaEntity> findAllByEntityTypeAndEntityId(EntityType entityType, UUID entityId);
}
