package org.aionys.aionystesttask.dto;

import java.time.LocalDateTime;

public record NoteResponseDto(
        Long id,
        String title,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Boolean isCompleted
) {}
