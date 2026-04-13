package com.dev.smarttask.template.application.port.in;

import com.dev.smarttask.template.application.port.in.command.CreateTemplateCommand;
import com.dev.smarttask.template.domain.model.TaskTemplate;

import java.time.LocalDate;
import java.util.UUID;

public interface CreateTemplateUseCase {
    TaskTemplate create(CreateTemplateCommand command);
    TaskTemplate createFromDate(UUID userId, LocalDate sourceDate, String title);
}
