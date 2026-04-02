package com.dev.smarttask.common.application.port.out;

import com.dev.smarttask.common.domain.model.Attachment;
import com.dev.smarttask.common.domain.model.EntityType;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AttachmentRepositoryPort {

    Attachment save(Attachment attachment);

    List<Attachment> findByEntity(EntityType entityType, UUID entityId);

    Optional<Attachment> findById(UUID id);

    void deleteById(UUID id);
}
