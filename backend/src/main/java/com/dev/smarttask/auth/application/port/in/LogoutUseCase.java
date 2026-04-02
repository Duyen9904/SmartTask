package com.dev.smarttask.auth.application.port.in;

import java.util.UUID;

public interface LogoutUseCase {

    void logout(UUID userId);
}
