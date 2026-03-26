package com.dev.smarttask.auth.application.port.in.command;

public record LoginCommand(
        String email,
        String password
) {}
