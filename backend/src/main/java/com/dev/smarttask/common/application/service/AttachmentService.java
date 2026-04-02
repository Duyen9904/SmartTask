package com.dev.smarttask.common.application.service;

import com.dev.smarttask.common.application.port.in.DeleteAttachmentUseCase;
import com.dev.smarttask.common.application.port.in.GetAttachmentUseCase;
import com.dev.smarttask.common.application.port.in.UploadAttachmentUseCase;
import com.dev.smarttask.common.application.port.in.command.ConfirmUploadCommand;
import com.dev.smarttask.common.application.port.in.command.RequestUploadCommand;
import com.dev.smarttask.common.application.port.out.AttachmentRepositoryPort;
import com.dev.smarttask.common.application.port.out.StoragePort;
import com.dev.smarttask.common.domain.model.Attachment;
import com.dev.smarttask.common.domain.model.EntityType;
import com.dev.smarttask.common.domain.model.PresignedUrlResult;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AttachmentService implements UploadAttachmentUseCase, GetAttachmentUseCase, DeleteAttachmentUseCase {

    private final StoragePort storagePort;
    private final AttachmentRepositoryPort attachmentRepository;

    private static final long MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
    private static final Set<String> ALLOWED_MIME_TYPES = Set.of(
            "image/jpeg", "image/png", "image/webp", "image/gif"
    );

    @Override
    public PresignedUrlResult requestUploadUrl(RequestUploadCommand command) {
        // Validate file size
        if (command.sizeBytes() > MAX_FILE_SIZE_BYTES) {
            throw new IllegalArgumentException("File size exceeds maximum allowed: " + MAX_FILE_SIZE_BYTES + " bytes");
        }

        // Validate MIME type
        if (!ALLOWED_MIME_TYPES.contains(command.contentType())) {
            throw new IllegalArgumentException("Unsupported file type: " + command.contentType()
                    + ". Allowed: " + ALLOWED_MIME_TYPES);
        }

        // Build object key: {entityType}/{entityId}/{uuid}_{filename}
        String objectName = String.format("%s/%s/%s_%s",
                command.entityType().name().toLowerCase(),
                command.entityId(),
                UUID.randomUUID(),
                sanitizeFilename(command.filename()));

        PresignedUrlResult result = storagePort.generateUploadUrl(objectName, command.contentType());
        log.info("Upload URL generated: entity={}:{}, object={}", command.entityType(), command.entityId(), objectName);

        return result;
    }

    @Override
    public Attachment confirmUpload(ConfirmUploadCommand command) {
        Attachment attachment = Attachment.builder()
                .entityType(command.entityType())
                .entityId(command.entityId())
                .url(command.objectName())
                .mimeType(command.mimeType())
                .sizeBytes(command.sizeBytes())
                .uploadedByUserId(command.userId())
                .build();

        Attachment saved = attachmentRepository.save(attachment);
        log.info("Upload confirmed: attachmentId={}, object={}", saved.getId(), command.objectName());

        return saved;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Attachment> getByEntity(EntityType entityType, UUID entityId) {
        return attachmentRepository.findByEntity(entityType, entityId);
    }

    @Override
    @Transactional(readOnly = true)
    public PresignedUrlResult getDownloadUrl(UUID attachmentId) {
        Attachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new EntityNotFoundException("Attachment not found: " + attachmentId));

        return storagePort.generateDownloadUrl(attachment.getUrl());
    }

    @Override
    public void delete(UUID attachmentId, UUID userId) {
        Attachment attachment = attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new EntityNotFoundException("Attachment not found: " + attachmentId));

        if (!attachment.getUploadedByUserId().equals(userId)) {
            throw new IllegalArgumentException("Not authorized to delete this attachment");
        }

        storagePort.deleteObject(attachment.getUrl());
        attachmentRepository.deleteById(attachmentId);
        log.info("Attachment deleted: id={}, object={}", attachmentId, attachment.getUrl());
    }

    private String sanitizeFilename(String filename) {
        return filename.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}
