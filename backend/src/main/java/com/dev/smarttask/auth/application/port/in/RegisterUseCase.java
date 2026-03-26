package com.dev.smarttask.auth.application.port.in;

import com.dev.smarttask.auth.application.dto.AuthResponse;
import com.dev.smarttask.auth.application.port.in.command.RegisterCommand;

public interface RegisterUseCase {

    AuthResponse register(RegisterCommand command);
}
