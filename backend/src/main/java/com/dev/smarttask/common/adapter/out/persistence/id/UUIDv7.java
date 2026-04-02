package com.dev.smarttask.common.adapter.out.persistence.id;

import org.hibernate.annotations.IdGeneratorType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Marks an {@code @Id} field to use UUIDv7 (time-ordered UUID) generation.
 * <p>
 * Replaces the deprecated {@code @GenericGenerator} approach.
 *
 * <pre>
 * {@code
 * @Id
 * @UUIDv7
 * @Column(name = "id", updatable = false, nullable = false)
 * private UUID id;
 * }
 * </pre>
 */
@IdGeneratorType(UUIDv7Generator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD})
public @interface UUIDv7 {
}
