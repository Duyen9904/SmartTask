package com.dev.smarttask.notification.adapter.out.persistence.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Document(collection = "notifications")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDocument {

    @Id
    private String id;

    @Indexed
    private UUID userId;

    private String title;
    private String message;
    private String type;     // TASK_DUE | SOCIAL | ROOM
    private UUID referenceId;

    @Builder.Default
    private boolean isRead = false;

    private LocalDateTime createdAt;

    @Indexed
    private LocalDateTime archivedAt;
}
