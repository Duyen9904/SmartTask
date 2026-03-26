package com.dev.smarttask.auth.adapter.out.persistence.mapper;

import com.dev.smarttask.auth.adapter.out.persistence.entity.RefreshTokenJpaEntity;
import com.dev.smarttask.auth.adapter.out.persistence.entity.UserJpaEntity;
import com.dev.smarttask.auth.domain.model.RefreshToken;
import com.dev.smarttask.auth.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface AuthPersistenceMapper {

    // User mappings
    UserJpaEntity toJpaEntity(User user);

    User toDomain(UserJpaEntity entity);

    // RefreshToken mappings
    RefreshTokenJpaEntity toJpaEntity(RefreshToken refreshToken);

    RefreshToken toDomain(RefreshTokenJpaEntity entity);
}
