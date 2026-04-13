package com.dev.smarttask.template.adapter.in.web.dto;

import com.dev.smarttask.task.domain.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class CreateTemplateRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    private Category category = Category.PERSONAL;
    
    private boolean isPublic = false;
    
    @NotNull(message = "Items list cannot be null")
    private List<TemplateItemRequest> items;
}
