package com.dev.smarttask.social.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a group member.
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupMember {

    private UUID id;
    private UUID groupId;
    private UUID userId;

    @Builder.Default
    private GroupRole role = GroupRole.MEMBER;

    private LocalDateTime joinedAt;
}
