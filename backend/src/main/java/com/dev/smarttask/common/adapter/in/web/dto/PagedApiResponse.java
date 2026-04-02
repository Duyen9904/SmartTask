package com.dev.smarttask.common.adapter.in.web.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PagedApiResponse<T> {

    private final boolean success;
    private final String message;
    private final List<T> content;
    private final int page;
    private final int size;
    private final int totalPages;
    private final long totalElements;
    private final LocalDateTime timestamp;

    public static <T> PagedApiResponse<T> of(org.springframework.data.domain.Page<T> pageData) {
        return PagedApiResponse.<T>builder()
                .success(true)
                .content(pageData.getContent())
                .page(pageData.getNumber())
                .size(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> PagedApiResponse<T> of(org.springframework.data.domain.Page<T> pageData, String message) {
        return PagedApiResponse.<T>builder()
                .success(true)
                .message(message)
                .content(pageData.getContent())
                .page(pageData.getNumber())
                .size(pageData.getSize())
                .totalPages(pageData.getTotalPages())
                .totalElements(pageData.getTotalElements())
                .timestamp(LocalDateTime.now())
                .build();
    }
}
