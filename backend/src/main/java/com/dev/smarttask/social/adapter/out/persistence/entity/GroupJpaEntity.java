package com.dev.smarttask.social.adapter.out.persistence.entity;

import com.dev.smarttask.common.adapter.out.persistence.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@Entity
@Table(name = "groups")
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class GroupJpaEntity extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 10)
    private String abbreviation;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_by", nullable = false)
    private UUID createdBy;
}
