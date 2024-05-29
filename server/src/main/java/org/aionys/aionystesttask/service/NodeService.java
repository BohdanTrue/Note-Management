package org.aionys.aionystesttask.service;

import org.aionys.aionystesttask.dto.NoteRequestDto;
import org.aionys.aionystesttask.dto.NoteResponseDto;
import org.aionys.aionystesttask.dto.NoteUpdateRequestDto;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface NodeService {
    NoteResponseDto create(NoteRequestDto requestDto);

    List<NoteResponseDto> getAll(Pageable pageable);

    NoteResponseDto getById(Long id);

    NoteResponseDto update(Long id, NoteUpdateRequestDto requestDto);

    void remove(Long id);
}
