package com.dev.smarttask.common.adapter.in.web;

import com.dev.smarttask.common.adapter.in.web.dto.ApiResponse;
import com.dev.smarttask.common.adapter.in.web.dto.AttachmentResponse;
import com.dev.smarttask.common.adapter.in.web.dto.ConfirmUploadRequest;
import com.dev.smarttask.common.adapter.in.web.dto.PresignedUrlResponse;
import com.dev.smarttask.common.adapter.in.web.dto.RequestUploadUrlRequest;
import com.dev.smarttask.common.adapter.in.web.security.CurrentUser;
import com.dev.smarttask.common.application.port.in.DeleteAttachmentUseCase;
import com.dev.smarttask.common.application.port.in.GetAttachmentUseCase;
import com.dev.smarttask.common.application.port.in.UploadAttachmentUseCase;
import com.dev.smarttask.common.application.port.in.command.ConfirmUploadCommand;
import com.dev.smarttask.common.application.port.in.command.RequestUploadCommand;
import com.dev.smarttask.common.domain.model.Attachment;
import com.dev.smarttask.common.domain.model.EntityType;
import com.dev.smarttask.common.domain.model.PresignedUrlResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/attachments")
@RequiredArgsConstructor
@Tag(name = "Attachments", description = "File upload and download via GCP presigned URLs")
public class AttachmentController {

    private final UploadAttachmentUseCase uploadAttachmentUseCase;
    private final GetAttachmentUseCase getAttachmentUseCase;
    private final DeleteAttachmentUseCase deleteAttachmentUseCase;

    @PostMapping("/upload-url")
    @Operation(summary = "Get a presigned PUT URL for file upload")
    public ResponseEntity<ApiResponse<PresignedUrlResponse>> requestUploadUrl(
            @CurrentUser UUID userId,
            @Valid @RequestBody RequestUploadUrlRequest request) {

        EntityType entityType = parseEntityType(request.entityType());

        RequestUploadCommand command = new RequestUploadCommand(
                entityType, request.entityId(), request.filename(),
                request.contentType(), request.sizeBytes(), userId);

        PresignedUrlResult result = uploadAttachmentUseCase.requestUploadUrl(command);

        PresignedUrlResponse response = new PresignedUrlResponse(
                result.getUrl(), result.getObjectName(), result.getExpiresAt());

        return ResponseEntity.ok(ApiResponse.success(response, "Upload URL generated"));
    }

    @PostMapping("/confirm")
    @Operation(summary = "Confirm a completed upload and persist attachment metadata")
    public ResponseEntity<ApiResponse<AttachmentResponse>> confirmUpload(
            @CurrentUser UUID userId,
            @Valid @RequestBody ConfirmUploadRequest request) {

        EntityType entityType = parseEntityType(request.entityType());

        ConfirmUploadCommand command = new ConfirmUploadCommand(
                request.objectName(), entityType, request.entityId(),
                request.mimeType(), request.sizeBytes(), userId);

        Attachment attachment = uploadAttachmentUseCase.confirmUpload(command);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(toResponse(attachment), "Upload confirmed"));
    }

    @GetMapping
    @Operation(summary = "List attachments for an entity")
    public ResponseEntity<ApiResponse<List<AttachmentResponse>>> getAttachments(
            @RequestParam String entityType,
            @RequestParam UUID entityId) {

        EntityType type = parseEntityType(entityType);

        List<AttachmentResponse> responses = getAttachmentUseCase.getByEntity(type, entityId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(ApiResponse.success(responses));
    }

    @GetMapping("/{attachmentId}/download-url")
    @Operation(summary = "Get a presigned GET URL to download a file")
    public ResponseEntity<ApiResponse<PresignedUrlResponse>> getDownloadUrl(
            @PathVariable UUID attachmentId) {

        PresignedUrlResult result = getAttachmentUseCase.getDownloadUrl(attachmentId);

        PresignedUrlResponse response = new PresignedUrlResponse(
                result.getUrl(), result.getObjectName(), result.getExpiresAt());

        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @DeleteMapping("/{attachmentId}")
    @Operation(summary = "Delete an attachment")
    public ResponseEntity<Void> deleteAttachment(
            @CurrentUser UUID userId,
            @PathVariable UUID attachmentId) {

        deleteAttachmentUseCase.delete(attachmentId, userId);

        return ResponseEntity.noContent().build();
    }

    // ── Private helpers ──

    private AttachmentResponse toResponse(Attachment attachment) {
        return new AttachmentResponse(
                attachment.getId(),
                attachment.getEntityType().name(),
                attachment.getEntityId(),
                attachment.getUrl(),
                attachment.getMimeType(),
                attachment.getSizeBytes(),
                attachment.getUploadedByUserId(),
                attachment.getCreatedAt()
        );
    }

    private EntityType parseEntityType(String value) {
        try {
            return EntityType.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid entity type: " + value);
        }
    }
}
