package com.dev.smarttask.common.application.port.in;

import com.dev.smarttask.common.domain.model.Attachment;
import com.dev.smarttask.common.domain.model.EntityType;
import com.dev.smarttask.common.domain.model.PresignedUrlResult;

import java.util.List;
import java.util.UUID;

public interface GetAttachmentUseCase {

    List<Attachment> getByEntity(EntityType entityType, UUID entityId);

    PresignedUrlResult getDownloadUrl(UUID attachmentId);
}
