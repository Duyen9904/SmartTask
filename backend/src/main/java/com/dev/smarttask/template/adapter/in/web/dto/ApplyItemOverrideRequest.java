package com.dev.smarttask.template.adapter.in.web.dto;

import com.dev.smarttask.task.domain.model.Priority;
import lombok.Data;

import java.time.LocalTime;

@Data
public class ApplyItemOverrideRequest {
    private int displayOrder;
    private String title;
    private Priority priority;
    private LocalTime scheduledTime;
    private boolean skip = false;
}
