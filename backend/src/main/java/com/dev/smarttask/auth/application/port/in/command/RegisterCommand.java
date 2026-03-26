package com.dev.smarttask.auth.application.port.in.command;

public record RegisterCommand(
        String email,
        String password,
        String fullName
) {}
