package com.dev.smarttask.auth.application.port.in;

import com.dev.smarttask.auth.domain.model.User;

import java.util.UUID;

public interface GetCurrentUserUseCase {

    User getCurrentUser(UUID userId);
}
