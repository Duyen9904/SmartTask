package com.dev.smarttask.auth.application.port.in.command;

public record RefreshCommand(
        String refreshToken
) {}
