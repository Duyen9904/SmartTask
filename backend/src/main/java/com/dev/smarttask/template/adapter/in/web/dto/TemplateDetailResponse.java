package com.dev.smarttask.template.adapter.in.web.dto;

import com.dev.smarttask.task.domain.model.Category;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class TemplateDetailResponse {
    private UUID id;
    private String title;
    private Category category;
    private boolean isPublic;
    private int usageCount;
    private LocalDateTime createdAt;
    private List<TemplateItemResponse> items;
}
