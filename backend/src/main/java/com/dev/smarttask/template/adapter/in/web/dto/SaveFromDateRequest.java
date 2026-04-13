package com.dev.smarttask.template.adapter.in.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SaveFromDateRequest {
    @NotNull(message = "Source date is required")
    private LocalDate sourceDate;
    
    @NotBlank(message = "Template title is required")
    private String templateTitle;
}
