package com.dev.smarttask.social.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Domain entity representing a friendship between two users.
 * userIdA is always LEAST(a,b), userIdB is always GREATEST(a,b).
 * Pure Java — no framework dependencies.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Friendship {

    private UUID id;
    private UUID userIdA;
    private UUID userIdB;

    @Builder.Default
    private FriendshipStatus status = FriendshipStatus.PENDING;

    private UUID initiatedBy;
    private LocalDateTime createdAt;
}
