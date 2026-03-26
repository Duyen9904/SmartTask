package com.dev.smarttask.auth.adapter.out.persistence;

import com.dev.smarttask.auth.adapter.out.persistence.mapper.AuthPersistenceMapper;
import com.dev.smarttask.auth.application.port.out.RefreshTokenRepositoryPort;
import com.dev.smarttask.auth.domain.model.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class RefreshTokenRepositoryAdapter implements RefreshTokenRepositoryPort {

    private final JpaRefreshTokenRepository jpaRefreshTokenRepository;
    private final AuthPersistenceMapper mapper;

    @Override
    public RefreshToken save(RefreshToken refreshToken) {
        var entity = mapper.toJpaEntity(refreshToken);
        var saved = jpaRefreshTokenRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return jpaRefreshTokenRepository.findByToken(token)
                .map(mapper::toDomain);
    }

    @Override
    public void deleteByUserId(UUID userId) {
        jpaRefreshTokenRepository.deleteByUserId(userId);
    }

    @Override
    public void revokeAllByUserId(UUID userId) {
        jpaRefreshTokenRepository.revokeAllByUserId(userId);
    }
}
