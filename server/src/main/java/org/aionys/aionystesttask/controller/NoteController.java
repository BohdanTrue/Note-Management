package org.aionys.aionystesttask.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.aionys.aionystesttask.dto.NoteRequestDto;
import org.aionys.aionystesttask.dto.NoteResponseDto;
import org.aionys.aionystesttask.dto.NoteUpdateRequestDto;
import org.aionys.aionystesttask.service.NodeService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@Tag(name = "Notes management", description = "Endpoints for managing notes")
@RequestMapping("/notes")
@RequiredArgsConstructor
public class NoteController {
    private final NodeService noteService;

    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new note", description = "Create a new note")
    @PostMapping
    public NoteResponseDto create(@RequestBody @Valid NoteRequestDto requestDto) {
        return noteService.create(requestDto);
    }

    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Get all notes", description = "Get a list of all notes")
    @GetMapping
    public List<NoteResponseDto> getAll(Pageable pageable) {
        return noteService.getAll(pageable);
    }

    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Get a note by id", description = "Get a note by certain id")
    @GetMapping("/{id}")
    public NoteResponseDto getById(@PathVariable Long id) {
        return noteService.getById(id);
    }

    @ResponseStatus(HttpStatus.OK)
    @Operation(summary = "Update a note by id", description = "Update a note by certain id")
    @PutMapping("/{id}")
    public NoteResponseDto update(
            @PathVariable Long id,
            @RequestBody NoteUpdateRequestDto requestDto
    ) {
        return noteService.update(id, requestDto);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Delete a note by id", description = "Delete a note by certain id")
    @DeleteMapping("/{id}")
    public void remove(@PathVariable Long id) {
        noteService.remove(id);
    }
}
