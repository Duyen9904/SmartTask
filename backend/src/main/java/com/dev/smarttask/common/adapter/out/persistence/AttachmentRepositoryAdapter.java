package com.dev.smarttask.common.adapter.out.persistence;

import com.dev.smarttask.common.adapter.out.persistence.mapper.AttachmentPersistenceMapper;
import com.dev.smarttask.common.application.port.out.AttachmentRepositoryPort;
import com.dev.smarttask.common.domain.model.Attachment;
import com.dev.smarttask.common.domain.model.EntityType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AttachmentRepositoryAdapter implements AttachmentRepositoryPort {

    private final JpaAttachmentRepository jpaAttachmentRepository;
    private final AttachmentPersistenceMapper mapper;

    @Override
    public Attachment save(Attachment attachment) {
        var entity = mapper.toJpaEntity(attachment);
        var saved = jpaAttachmentRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public List<Attachment> findByEntity(EntityType entityType, UUID entityId) {
        return jpaAttachmentRepository.findAllByEntityTypeAndEntityId(entityType, entityId)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public Optional<Attachment> findById(UUID id) {
        return jpaAttachmentRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public void deleteById(UUID id) {
        jpaAttachmentRepository.deleteById(id);
    }
}
