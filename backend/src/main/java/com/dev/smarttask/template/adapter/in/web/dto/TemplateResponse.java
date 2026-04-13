package com.dev.smarttask.template.adapter.in.web.dto;

import com.dev.smarttask.task.domain.model.Category;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class TemplateResponse {
    private UUID id;
    private String title;
    private Category category;
    private boolean isPublic;
    private int usageCount;
    private LocalDateTime createdAt;
    // Note: itemCount is not in the domain model directly, but we can compute it or leave it. 
    // In actual implementation we might fetch it or just omit it in the list if not strictly needed.
}
