package com.dev.smarttask.room.adapter.out.persistence.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.UUID;

@Document(collection = "chat_messages")
@CompoundIndex(name = "idx_room_sent", def = "{'roomId': 1, 'sentAt': 1}")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDocument {

    @Id
    private String id;

    private UUID roomId;
    private UUID senderId;
    private String content;
    private LocalDateTime sentAt;
}
