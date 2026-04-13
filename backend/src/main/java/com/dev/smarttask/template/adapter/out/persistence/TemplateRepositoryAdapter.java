package com.dev.smarttask.template.adapter.out.persistence;

import com.dev.smarttask.template.adapter.out.persistence.mapper.TemplatePersistenceMapper;
import com.dev.smarttask.template.application.port.out.TemplateRepositoryPort;
import com.dev.smarttask.template.domain.model.TaskTemplate;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TemplateRepositoryAdapter implements TemplateRepositoryPort {

    private final JpaTaskTemplateRepository jpaTaskTemplateRepository;
    private final TemplatePersistenceMapper mapper;

    @Override
    public TaskTemplate save(TaskTemplate template) {
        var entity = mapper.toJpaEntity(template);
        var saved = jpaTaskTemplateRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<TaskTemplate> findById(UUID id) {
        return jpaTaskTemplateRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public List<TaskTemplate> findAllByCreatedBy(UUID createdBy) {
        return jpaTaskTemplateRepository.findAllByCreatedBy(createdBy)
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public List<TaskTemplate> findAllPublicTemplates() {
        return jpaTaskTemplateRepository.findAllByIsPublicTrue()
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    @Override
    public void deleteById(UUID id) {
        jpaTaskTemplateRepository.deleteById(id);
    }
}
