package com.dev.smarttask.template.adapter.in.web.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ApplyTemplateRequest {
    @NotNull(message = "Target date is required")
    private LocalDate targetDate;
    
    private List<ApplyItemOverrideRequest> overrides;
}
