package com.dev.smarttask.room.adapter.out.persistence.mapper;

import com.dev.smarttask.room.adapter.out.persistence.entity.ChecklistItemJpaEntity;
import com.dev.smarttask.room.adapter.out.persistence.entity.ChecklistProofJpaEntity;
import com.dev.smarttask.room.adapter.out.persistence.entity.HuddleJpaEntity;
import com.dev.smarttask.room.adapter.out.persistence.entity.HuddleParticipantJpaEntity;
import com.dev.smarttask.room.adapter.out.persistence.entity.RoomJpaEntity;
import com.dev.smarttask.room.adapter.out.persistence.entity.RoomMemberJpaEntity;
import com.dev.smarttask.room.domain.model.ChecklistItem;
import com.dev.smarttask.room.domain.model.ChecklistProof;
import com.dev.smarttask.room.domain.model.Huddle;
import com.dev.smarttask.room.domain.model.HuddleParticipant;
import com.dev.smarttask.room.domain.model.Room;
import com.dev.smarttask.room.domain.model.RoomMember;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface RoomPersistenceMapper {

    RoomJpaEntity toJpaEntity(Room room);
    Room toDomain(RoomJpaEntity entity);

    RoomMemberJpaEntity toJpaEntity(RoomMember member);
    RoomMember toDomain(RoomMemberJpaEntity entity);

    ChecklistItemJpaEntity toJpaEntity(ChecklistItem item);
    ChecklistItem toDomain(ChecklistItemJpaEntity entity);

    ChecklistProofJpaEntity toJpaEntity(ChecklistProof proof);
    ChecklistProof toDomain(ChecklistProofJpaEntity entity);

    HuddleJpaEntity toJpaEntity(Huddle huddle);
    Huddle toDomain(HuddleJpaEntity entity);

    HuddleParticipantJpaEntity toJpaEntity(HuddleParticipant participant);
    HuddleParticipant toDomain(HuddleParticipantJpaEntity entity);
}
