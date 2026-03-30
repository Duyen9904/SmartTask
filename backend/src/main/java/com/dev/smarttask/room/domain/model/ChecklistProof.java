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
public class ChecklistProof {

    private UUID id;
    private UUID checklistItemId;
    private UUID uploadedByUserId;
    private String fileUrl;
    private String mimeType;
    private String caption;
    private LocalDateTime uploadedAt;
}
