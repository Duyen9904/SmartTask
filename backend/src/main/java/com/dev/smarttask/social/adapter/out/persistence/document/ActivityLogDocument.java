package com.dev.smarttask.social.adapter.out.persistence.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Document(collection = "activity_logs")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityLogDocument {

    @Id
    private String id;

    @Indexed
    private UUID userId;

    private String actorType;  // USER | SYSTEM
    private String verb;       // TASK_COMPLETED | ROOM_JOINED | ...
    private UUID objectId;
    private String objectType; // TASK | ROOM | TEMPLATE | ...
    private Map<String, Object> meta;

    @Indexed
    private LocalDateTime createdAt;
}
