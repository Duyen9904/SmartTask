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
import java.util.UUID;

@Document(collection = "activity_reactions")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityReactionDocument {

    @Id
    private String id;

    @Indexed
    private String activityId;

    private UUID userId;
    private String reactionType; // CHEER | LIKE
    private LocalDateTime createdAt;
}
