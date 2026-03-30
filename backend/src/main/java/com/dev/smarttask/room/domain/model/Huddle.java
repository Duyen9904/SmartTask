package com.dev.smarttask.room.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Huddle {

    private UUID id;
    private UUID roomId;
    private String title;
    private LocalDateTime scheduledAt;
    private UUID createdBy;
    private LocalDateTime createdAt;
}
