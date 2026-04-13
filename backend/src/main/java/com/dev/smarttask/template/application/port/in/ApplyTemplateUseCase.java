package com.dev.smarttask.template.application.port.in;

import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.template.application.port.in.command.ApplyTemplateCommand;

import java.util.List;

public interface ApplyTemplateUseCase {
    List<Task> apply(ApplyTemplateCommand command);
}
