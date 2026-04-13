package com.dev.smarttask.template.adapter.in.web.dto;

import com.dev.smarttask.task.domain.model.Priority;
import lombok.Builder;
import lombok.Data;

import java.time.LocalTime;

@Data
@Builder
public class TemplateItemResponse {
    private String title;
    private String description;
    private Priority priority;
    private LocalTime scheduledTime;
    private double estimatedHours;
    private int displayOrder;
}
