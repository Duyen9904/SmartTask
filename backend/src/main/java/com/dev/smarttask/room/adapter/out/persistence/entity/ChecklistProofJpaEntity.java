package com.dev.smarttask.room.adapter.out.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.dev.smarttask.common.adapter.out.persistence.id.UUIDv7;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "checklist_proofs")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChecklistProofJpaEntity {

    @Id
    @UUIDv7
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "checklist_item_id", nullable = false)
    private UUID checklistItemId;

    @Column(name = "uploaded_by_user_id", nullable = false)
    private UUID uploadedByUserId;

    @Column(name = "file_url", nullable = false, length = 500)
    private String fileUrl;

    @Column(name = "mime_type", length = 100)
    private String mimeType;

    @Column(length = 500)
    private String caption;

    @Column(name = "uploaded_at", nullable = false)
    private LocalDateTime uploadedAt;
}
