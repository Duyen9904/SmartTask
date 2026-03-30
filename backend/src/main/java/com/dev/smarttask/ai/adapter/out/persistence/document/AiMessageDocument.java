package com.dev.smarttask.ai.adapter.out.persistence.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "ai_messages")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiMessageDocument {

    @Id
    private String id;

    @Indexed
    private String conversationId;

    private String role;    // USER | ASSISTANT
    private String content;
    private LocalDateTime createdAt;
}
