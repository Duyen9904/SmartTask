package com.dev.smarttask.template.adapter.out.persistence.mapper;

import com.dev.smarttask.template.adapter.out.persistence.entity.TaskTemplateJpaEntity;
import com.dev.smarttask.template.adapter.out.persistence.entity.TemplateSubtaskJpaEntity;
import com.dev.smarttask.template.domain.model.TaskTemplate;
import com.dev.smarttask.template.domain.model.TemplateSubtask;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TemplatePersistenceMapper {

    TaskTemplateJpaEntity toJpaEntity(TaskTemplate template);
    TaskTemplate toDomain(TaskTemplateJpaEntity entity);

    TemplateSubtaskJpaEntity toJpaEntity(TemplateSubtask subtask);
    TemplateSubtask toDomain(TemplateSubtaskJpaEntity entity);
}
