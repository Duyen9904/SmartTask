package com.dev.smarttask.auth.application.port.in;

import com.dev.smarttask.auth.application.dto.AuthResponse;
import com.dev.smarttask.auth.application.port.in.command.RefreshCommand;

public interface RefreshTokenUseCase {

    AuthResponse refresh(RefreshCommand command);
}
