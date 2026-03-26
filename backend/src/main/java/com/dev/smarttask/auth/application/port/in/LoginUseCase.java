package com.dev.smarttask.auth.application.port.in;

import com.dev.smarttask.auth.application.dto.AuthResponse;
import com.dev.smarttask.auth.application.port.in.command.LoginCommand;

public interface LoginUseCase {

    AuthResponse login(LoginCommand command);
}
