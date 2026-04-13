package com.dev.smarttask.template.domain.exception;

import java.util.UUID;

public class TemplateNotFoundException extends RuntimeException {
    public TemplateNotFoundException(UUID templateId) {
        super("Template not found with ID: " + templateId);
    }
}
