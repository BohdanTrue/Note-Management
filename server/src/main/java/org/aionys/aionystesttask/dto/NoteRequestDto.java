package org.aionys.aionystesttask.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NoteRequestDto {
    @NotBlank(message = "cannot be null or empty")
    @Size(min = 4, max = 50)
    private String title;
}