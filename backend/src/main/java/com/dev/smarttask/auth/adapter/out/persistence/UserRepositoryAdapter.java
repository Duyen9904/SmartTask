package com.dev.smarttask.auth.adapter.out.persistence;

import com.dev.smarttask.auth.adapter.out.persistence.mapper.AuthPersistenceMapper;
import com.dev.smarttask.auth.application.port.out.UserRepositoryPort;
import com.dev.smarttask.auth.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class UserRepositoryAdapter implements UserRepositoryPort {

    private final JpaUserRepository jpaUserRepository;
    private final AuthPersistenceMapper mapper;

    @Override
    public User save(User user) {
        var entity = mapper.toJpaEntity(user);
        var saved = jpaUserRepository.save(entity);
        return mapper.toDomain(saved);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpaUserRepository.findByEmail(email)
                .map(mapper::toDomain);
    }

    @Override
    public Optional<User> findById(UUID id) {
        return jpaUserRepository.findById(id)
                .map(mapper::toDomain);
    }

    @Override
    public boolean existsByEmail(String email) {
        return jpaUserRepository.existsByEmail(email);
    }
}
