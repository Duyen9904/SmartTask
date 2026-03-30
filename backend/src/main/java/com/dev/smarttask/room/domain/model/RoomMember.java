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
public class RoomMember {

    private UUID id;
    private UUID roomId;
    private UUID userId;

    @Builder.Default
    private RoomRole role = RoomRole.MEMBER;

    private LocalDateTime joinedAt;
    private LocalDateTime lastSeenAt;
}
