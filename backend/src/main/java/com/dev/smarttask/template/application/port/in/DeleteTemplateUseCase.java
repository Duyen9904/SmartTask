package com.dev.smarttask.template.application.port.in;

import java.util.UUID;

public interface DeleteTemplateUseCase {
    void delete(UUID templateId, UUID userId);
}
