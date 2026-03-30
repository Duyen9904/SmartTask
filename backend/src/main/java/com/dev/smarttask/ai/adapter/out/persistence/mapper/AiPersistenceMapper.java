package com.dev.smarttask.ai.adapter.out.persistence.mapper;

import com.dev.smarttask.ai.adapter.out.persistence.entity.FocusSessionJpaEntity;
import com.dev.smarttask.ai.domain.model.FocusSession;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AiPersistenceMapper {

    FocusSessionJpaEntity toJpaEntity(FocusSession session);
    FocusSession toDomain(FocusSessionJpaEntity entity);
}
