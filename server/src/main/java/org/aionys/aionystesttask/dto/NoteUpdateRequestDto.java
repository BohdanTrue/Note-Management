package org.aionys.aionystesttask.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NoteUpdateRequestDto extends NoteRequestDto {
    @NotBlank(message = "cannot be null or empty")
    private Boolean isCompleted;
}
