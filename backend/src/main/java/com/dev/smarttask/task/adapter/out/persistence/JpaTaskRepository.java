package com.dev.smarttask.task.adapter.out.persistence;

import com.dev.smarttask.task.adapter.out.persistence.entity.TaskJpaEntity;
import com.dev.smarttask.task.domain.model.Category;
import com.dev.smarttask.task.domain.model.Priority;
import com.dev.smarttask.task.domain.model.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface JpaTaskRepository extends JpaRepository<TaskJpaEntity, UUID> {

    List<TaskJpaEntity> findAllByUserIdAndDeletedAtIsNullAndParentTemplateIdIsNullOrderByDisplayOrder(UUID userId);

    List<TaskJpaEntity> findAllByUserIdAndStatusAndDeletedAtIsNullAndParentTemplateIdIsNull(UUID userId, TaskStatus status);

    Page<TaskJpaEntity> findAllByUserIdAndDeletedAtIsNullAndParentTemplateIdIsNullOrderByDisplayOrder(UUID userId, Pageable pageable);

    List<TaskJpaEntity> findAllByParentTemplateIdOrderByDisplayOrder(UUID templateId);

    List<TaskJpaEntity> findAllByUserIdAndScheduledDateAndDeletedAtIsNullAndParentTemplateIdIsNull(UUID userId, LocalDate date);

    @Query("""
            SELECT t FROM TaskJpaEntity t
            WHERE t.userId = :userId
              AND t.deletedAt IS NULL
              AND t.parentTemplateId IS NULL
              AND (:status IS NULL OR t.status = :status)
              AND (:priority IS NULL OR t.priority = :priority)
              AND (:category IS NULL OR t.category = :category)
              AND (:fromDate IS NULL OR t.scheduledDate >= :fromDate)
              AND (:toDate IS NULL OR t.scheduledDate <= :toDate)
              AND (:keyword IS NULL OR LOWER(CAST(t.title AS string)) LIKE LOWER(CONCAT('%', CAST(:keyword AS string), '%'))
                   OR LOWER(CAST(t.description AS string)) LIKE LOWER(CONCAT('%', CAST(:keyword AS string), '%')))
            """)
    Page<TaskJpaEntity> findByFilters(
            @Param("userId") UUID userId,
            @Param("status") TaskStatus status,
            @Param("priority") Priority priority,
            @Param("category") Category category,
            @Param("fromDate") LocalDate fromDate,
            @Param("toDate") LocalDate toDate,
            @Param("keyword") String keyword,
            Pageable pageable);
}
