package com.dev.smarttask.template.application.port.out;

import com.dev.smarttask.template.domain.model.TaskTemplate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TemplateRepositoryPort {

    TaskTemplate save(TaskTemplate template);

    Optional<TaskTemplate> findById(UUID id);

    List<TaskTemplate> findAllByCreatedBy(UUID createdBy);

    List<TaskTemplate> findAllPublicTemplates();

    void deleteById(UUID id);
}
