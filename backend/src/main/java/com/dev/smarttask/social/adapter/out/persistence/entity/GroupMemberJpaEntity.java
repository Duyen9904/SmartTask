package com.dev.smarttask.social.adapter.out.persistence.entity;

import com.dev.smarttask.social.domain.model.GroupRole;
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
@Table(name = "group_members")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberJpaEntity {

    @Id
    @UUIDv7
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "group_id", nullable = false)
    private UUID groupId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private GroupRole role;

    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt;
}
