package com.dev.smarttask.task.adapter.in.web.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CopyDayRequest {
    @NotNull(message = "Source date is required")
    private LocalDate sourceDate;
    
    @NotNull(message = "Target date is required")
    private LocalDate targetDate;
}
