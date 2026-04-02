package com.dev.smarttask.common.application.port.in;

import java.util.UUID;

public interface DeleteAttachmentUseCase {

    void delete(UUID attachmentId, UUID userId);
}
