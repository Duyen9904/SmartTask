package com.dev.smarttask.social.adapter.out.persistence.entity;

import com.dev.smarttask.social.domain.model.FriendshipStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "friendships")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendshipJpaEntity {

    @Id
    @UUIDv7
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "user_id_a", nullable = false)
    private UUID userIdA;

    @Column(name = "user_id_b", nullable = false)
    private UUID userIdB;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private FriendshipStatus status;

    @Column(name = "initiated_by", nullable = false)
    private UUID initiatedBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
