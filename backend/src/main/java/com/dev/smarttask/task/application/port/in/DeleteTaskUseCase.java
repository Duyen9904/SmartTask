package com.dev.smarttask.task.application.port.in;

import java.util.UUID;

public interface DeleteTaskUseCase {

    void softDelete(UUID taskId, UUID userId);
}
