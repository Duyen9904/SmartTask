package com.dev.smarttask.common.adapter.out.persistence.mapper;

import com.dev.smarttask.common.adapter.out.persistence.entity.AttachmentJpaEntity;
import com.dev.smarttask.common.domain.model.Attachment;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AttachmentPersistenceMapper {

    AttachmentJpaEntity toJpaEntity(Attachment attachment);

    Attachment toDomain(AttachmentJpaEntity entity);
}
