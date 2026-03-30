package com.dev.smarttask.room.adapter.out.persistence.document;

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

@Document(collection = "room_events")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomEventDocument {

    @Id
    private String id;

    @Indexed
    private UUID roomId;

    private UUID userId;
    private String eventType;     // TASK_COMPLETED | MEMBER_JOINED | ...
    private String description;
    private UUID referenceId;
    private String referenceType; // CHECKLIST_ITEM | CHAT_MESSAGE | ...

    @Indexed
    private LocalDateTime createdAt;
}
