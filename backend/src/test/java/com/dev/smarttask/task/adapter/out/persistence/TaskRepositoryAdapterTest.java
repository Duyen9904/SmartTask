package com.dev.smarttask.task.adapter.out.persistence;

import com.dev.smarttask.task.adapter.out.persistence.entity.SubtaskJpaEntity;
import com.dev.smarttask.task.adapter.out.persistence.entity.TaskJpaEntity;
import com.dev.smarttask.task.adapter.out.persistence.mapper.TaskPersistenceMapper;
import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import com.dev.smarttask.task.domain.model.Subtask;
import com.dev.smarttask.task.domain.model.Task;
import com.dev.smarttask.task.domain.model.TaskStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("TaskRepositoryAdapter")
class TaskRepositoryAdapterTest {

    @Mock
    private JpaTaskRepository jpaTaskRepository;

    @Mock
    private TaskPersistenceMapper mapper;

    @InjectMocks
    private TaskRepositoryAdapter adapter;

    private final UUID taskId = UUID.randomUUID();
    private final UUID userId = UUID.randomUUID();

    private Task buildDomainTask() {
        return Task.builder()
                .id(taskId)
                .userId(userId)
                .title("Test")
                .priority(Priority.MEDIUM)
                .status(TaskStatus.PENDING)
                .category(Category.PERSONAL)
                .build();
    }

    private TaskJpaEntity buildJpaEntity() {
        return TaskJpaEntity.builder()
                .id(taskId)
                .userId(userId)
                .title("Test")
                .priority(Priority.MEDIUM)
                .status(TaskStatus.PENDING)
                .category(Category.PERSONAL)
                .displayOrder(0)
                .build();
    }

    @Nested
    @DisplayName("save()")
    class SaveTests {

        @Test
        @DisplayName("delegates to JPA repo via mapper")
        void save_delegatesToJpaAndMapper() {
            Task domain = buildDomainTask();
            TaskJpaEntity entity = buildJpaEntity();

            when(mapper.toJpaEntity(domain)).thenReturn(entity);
            when(jpaTaskRepository.save(entity)).thenReturn(entity);
            when(mapper.toDomain(entity)).thenReturn(domain);

            Task result = adapter.save(domain);

            assertEquals(taskId, result.getId());
            verify(mapper).toJpaEntity(domain);
            verify(jpaTaskRepository).save(entity);
            verify(mapper).toDomain(entity);
        }
    }

    @Nested
    @DisplayName("findById()")
    class FindByIdTests {

        @Test
        @DisplayName("returns mapped domain when found")
        void findById_found() {
            TaskJpaEntity entity = buildJpaEntity();
            Task domain = buildDomainTask();

            when(jpaTaskRepository.findById(taskId)).thenReturn(Optional.of(entity));
            when(mapper.toDomain(entity)).thenReturn(domain);

            Optional<Task> result = adapter.findById(taskId);

            assertTrue(result.isPresent());
            assertEquals(taskId, result.get().getId());
        }

        @Test
        @DisplayName("returns empty when not found")
        void findById_notFound() {
            when(jpaTaskRepository.findById(taskId)).thenReturn(Optional.empty());

            Optional<Task> result = adapter.findById(taskId);

            assertTrue(result.isEmpty());
        }
    }

    @Nested
    @DisplayName("findAllByUserId()")
    class FindAllTests {

        @Test
        @DisplayName("returns mapped list")
        void findAllByUserId_returnsMappedList() {
            TaskJpaEntity entity = buildJpaEntity();
            Task domain = buildDomainTask();

            when(jpaTaskRepository.findAllByUserIdAndDeletedAtIsNullOrderByDisplayOrder(userId))
                    .thenReturn(List.of(entity));
            when(mapper.toDomain(entity)).thenReturn(domain);

            List<Task> result = adapter.findAllByUserId(userId);

            assertEquals(1, result.size());
            assertEquals(taskId, result.get(0).getId());
        }
    }

    @Nested
    @DisplayName("deleteById()")
    class DeleteTests {

        @Test
        @DisplayName("delegates to JPA deleteById")
        void deleteById_delegatesToJpa() {
            adapter.deleteById(taskId);

            verify(jpaTaskRepository).deleteById(taskId);
        }
    }
}
