package com.dev.smarttask.common.application.service;

import com.dev.smarttask.common.application.port.in.command.ConfirmUploadCommand;
import com.dev.smarttask.common.application.port.in.command.RequestUploadCommand;
import com.dev.smarttask.common.application.port.out.AttachmentRepositoryPort;
import com.dev.smarttask.common.application.port.out.StoragePort;
import com.dev.smarttask.common.domain.model.Attachment;
import com.dev.smarttask.common.domain.model.EntityType;
import com.dev.smarttask.common.domain.model.PresignedUrlResult;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AttachmentService")
class AttachmentServiceTest {

    @Mock
    private StoragePort storagePort;

    @Mock
    private AttachmentRepositoryPort attachmentRepository;

    @InjectMocks
    private AttachmentService attachmentService;

    private UUID userId;
    private UUID entityId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        entityId = UUID.randomUUID();
    }

    // ── UploadAttachmentUseCase ──

    @Nested
    @DisplayName("requestUploadUrl()")
    class RequestUploadUrlTests {

        @Test
        @DisplayName("generates upload URL for valid request")
        void requestUploadUrl_success() {
            RequestUploadCommand command = new RequestUploadCommand(
                    EntityType.ACTIVITY, entityId, "photo.jpg",
                    "image/jpeg", 1024 * 1024, userId);

            PresignedUrlResult mockResult = PresignedUrlResult.builder()
                    .url("https://storage.googleapis.com/signed-url")
                    .objectName("activity/" + entityId + "/some-uuid_photo.jpg")
                    .expiresAt(LocalDateTime.now().plusMinutes(15))
                    .build();

            when(storagePort.generateUploadUrl(anyString(), eq("image/jpeg")))
                    .thenReturn(mockResult);

            PresignedUrlResult result = attachmentService.requestUploadUrl(command);

            assertNotNull(result);
            assertNotNull(result.getUrl());
            verify(storagePort).generateUploadUrl(anyString(), eq("image/jpeg"));
        }

        @Test
        @DisplayName("throws when file too large")
        void requestUploadUrl_tooLarge() {
            RequestUploadCommand command = new RequestUploadCommand(
                    EntityType.ACTIVITY, entityId, "big.jpg",
                    "image/jpeg", 20 * 1024 * 1024, userId); // 20 MB

            assertThrows(IllegalArgumentException.class,
                    () -> attachmentService.requestUploadUrl(command));

            verifyNoInteractions(storagePort);
        }

        @Test
        @DisplayName("throws when invalid MIME type")
        void requestUploadUrl_invalidMimeType() {
            RequestUploadCommand command = new RequestUploadCommand(
                    EntityType.ACTIVITY, entityId, "file.exe",
                    "application/x-executable", 1024, userId);

            assertThrows(IllegalArgumentException.class,
                    () -> attachmentService.requestUploadUrl(command));

            verifyNoInteractions(storagePort);
        }
    }

    @Nested
    @DisplayName("confirmUpload()")
    class ConfirmUploadTests {

        @Test
        @DisplayName("saves attachment on confirm")
        void confirmUpload_success() {
            ConfirmUploadCommand command = new ConfirmUploadCommand(
                    "activity/123/uuid_photo.jpg", EntityType.ACTIVITY,
                    entityId, "image/jpeg", 1024, userId);

            when(attachmentRepository.save(any(Attachment.class))).thenAnswer(inv -> {
                Attachment a = inv.getArgument(0);
                a.setId(UUID.randomUUID());
                return a;
            });

            Attachment result = attachmentService.confirmUpload(command);

            assertAll(
                    () -> assertNotNull(result.getId()),
                    () -> assertEquals(EntityType.ACTIVITY, result.getEntityType()),
                    () -> assertEquals("image/jpeg", result.getMimeType())
            );
        }
    }

    // ── GetAttachmentUseCase ──

    @Nested
    @DisplayName("getByEntity()")
    class GetByEntityTests {

        @Test
        @DisplayName("returns attachments for entity")
        void getByEntity_returnsList() {
            Attachment attachment = Attachment.builder()
                    .id(UUID.randomUUID())
                    .entityType(EntityType.ACTIVITY)
                    .entityId(entityId)
                    .build();

            when(attachmentRepository.findByEntity(EntityType.ACTIVITY, entityId))
                    .thenReturn(List.of(attachment));

            List<Attachment> result = attachmentService.getByEntity(EntityType.ACTIVITY, entityId);

            assertEquals(1, result.size());
        }
    }

    @Nested
    @DisplayName("getDownloadUrl()")
    class GetDownloadUrlTests {

        @Test
        @DisplayName("generates download URL for existing attachment")
        void getDownloadUrl_success() {
            UUID attachmentId = UUID.randomUUID();
            Attachment attachment = Attachment.builder()
                    .id(attachmentId)
                    .url("some/object/key.jpg")
                    .build();

            PresignedUrlResult mockResult = PresignedUrlResult.builder()
                    .url("https://storage.googleapis.com/signed-get-url")
                    .objectName("some/object/key.jpg")
                    .expiresAt(LocalDateTime.now().plusMinutes(60))
                    .build();

            when(attachmentRepository.findById(attachmentId)).thenReturn(Optional.of(attachment));
            when(storagePort.generateDownloadUrl("some/object/key.jpg")).thenReturn(mockResult);

            PresignedUrlResult result = attachmentService.getDownloadUrl(attachmentId);

            assertNotNull(result.getUrl());
        }

        @Test
        @DisplayName("throws when attachment not found")
        void getDownloadUrl_notFound() {
            UUID attachmentId = UUID.randomUUID();
            when(attachmentRepository.findById(attachmentId)).thenReturn(Optional.empty());

            assertThrows(EntityNotFoundException.class,
                    () -> attachmentService.getDownloadUrl(attachmentId));
        }
    }

    // ── DeleteAttachmentUseCase ──

    @Nested
    @DisplayName("delete()")
    class DeleteTests {

        @Test
        @DisplayName("deletes attachment when user is uploader")
        void delete_success() {
            UUID attachmentId = UUID.randomUUID();
            Attachment attachment = Attachment.builder()
                    .id(attachmentId)
                    .url("some/object/key.jpg")
                    .uploadedByUserId(userId)
                    .build();

            when(attachmentRepository.findById(attachmentId)).thenReturn(Optional.of(attachment));

            attachmentService.delete(attachmentId, userId);

            verify(storagePort).deleteObject("some/object/key.jpg");
            verify(attachmentRepository).deleteById(attachmentId);
        }

        @Test
        @DisplayName("throws when not uploader")
        void delete_notUploader() {
            UUID attachmentId = UUID.randomUUID();
            Attachment attachment = Attachment.builder()
                    .id(attachmentId)
                    .url("key.jpg")
                    .uploadedByUserId(UUID.randomUUID()) // different user
                    .build();

            when(attachmentRepository.findById(attachmentId)).thenReturn(Optional.of(attachment));

            assertThrows(IllegalArgumentException.class,
                    () -> attachmentService.delete(attachmentId, userId));

            verifyNoInteractions(storagePort);
        }

        @Test
        @DisplayName("throws when attachment not found")
        void delete_notFound() {
            UUID attachmentId = UUID.randomUUID();
            when(attachmentRepository.findById(attachmentId)).thenReturn(Optional.empty());

            assertThrows(EntityNotFoundException.class,
                    () -> attachmentService.delete(attachmentId, userId));
        }
    }
}
