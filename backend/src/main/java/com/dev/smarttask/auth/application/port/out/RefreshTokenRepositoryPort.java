package com.dev.smarttask.auth.application.port.out;

import com.dev.smarttask.auth.domain.model.RefreshToken;

import java.util.Optional;
import java.util.UUID;

public interface RefreshTokenRepositoryPort {

    RefreshToken save(RefreshToken refreshToken);

    Optional<RefreshToken> findByToken(String token);

    void deleteByUserId(UUID userId);

    void revokeAllByUserId(UUID userId);
}
