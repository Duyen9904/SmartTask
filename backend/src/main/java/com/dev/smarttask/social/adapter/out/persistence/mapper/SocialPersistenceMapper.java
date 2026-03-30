package com.dev.smarttask.social.adapter.out.persistence.mapper;

import com.dev.smarttask.social.adapter.out.persistence.entity.FriendshipJpaEntity;
import com.dev.smarttask.social.adapter.out.persistence.entity.GroupJpaEntity;
import com.dev.smarttask.social.adapter.out.persistence.entity.GroupMemberJpaEntity;
import com.dev.smarttask.social.adapter.out.persistence.entity.MoodEntryJpaEntity;
import com.dev.smarttask.social.domain.model.Friendship;
import com.dev.smarttask.social.domain.model.Group;
import com.dev.smarttask.social.domain.model.GroupMember;
import com.dev.smarttask.social.domain.model.MoodEntry;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface SocialPersistenceMapper {

    FriendshipJpaEntity toJpaEntity(Friendship friendship);
    Friendship toDomain(FriendshipJpaEntity entity);

    GroupJpaEntity toJpaEntity(Group group);
    Group toDomain(GroupJpaEntity entity);

    GroupMemberJpaEntity toJpaEntity(GroupMember member);
    GroupMember toDomain(GroupMemberJpaEntity entity);

    MoodEntryJpaEntity toJpaEntity(MoodEntry entry);
    MoodEntry toDomain(MoodEntryJpaEntity entity);
}
