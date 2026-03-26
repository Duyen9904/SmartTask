package com.dev.smarttask.auth.application.port.out;

import com.dev.smarttask.auth.domain.model.User;

import java.util.UUID;

public interface TokenProviderPort {

    String generateAccessToken(User user);

    String generateRefreshToken(User user);

    UUID getUserIdFromToken(String token);

    boolean validateToken(String token);

    long getAccessTokenExpirationMs();
}
