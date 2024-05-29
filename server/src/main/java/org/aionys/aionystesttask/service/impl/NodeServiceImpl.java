package org.aionys.aionystesttask.service.impl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.aionys.aionystesttask.dto.NoteRequestDto;
import org.aionys.aionystesttask.dto.NoteResponseDto;
import org.aionys.aionystesttask.dto.NoteUpdateRequestDto;
import org.aionys.aionystesttask.mapper.NoteMapper;
import org.aionys.aionystesttask.model.Note;
import org.aionys.aionystesttask.repository.NoteRepository;
import org.aionys.aionystesttask.service.NodeService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NodeServiceImpl implements NodeService {
    private final String CANNOT_FIND_BY_ID = "Cannot find note by id: ";
    private final String INCORRECT_TASK = "User already has this task: ";
    private final NoteRepository noteRepository;
    private final NoteMapper noteMapper;

    @Override
    public NoteResponseDto create(NoteRequestDto requestDto) {
        if (noteRepository.existsNoteByTitle(requestDto.getTitle())) {
            throw new IllegalArgumentException(INCORRECT_TASK + requestDto.getTitle());
        }

        return noteMapper.toDto(noteRepository.save(noteMapper.toModel(requestDto)));
    }

    @Override
    public List<NoteResponseDto> getAll(Pageable pageable) {
        return noteRepository.findAll(pageable).stream()
                .map(noteMapper::toDto)
                .toList();
    }

    @Override
    public NoteResponseDto getById(Long id) {
        return noteMapper.toDto(findById(id));
    }

    @Override
    @Transactional
    public NoteResponseDto update(Long id, NoteUpdateRequestDto requestDto) {
        Note note = findById(id);

        note.setTitle(requestDto.getTitle());
        note.setIsCompleted(requestDto.getIsCompleted());
        note.setUpdatedAt(LocalDateTime.now());

        return noteMapper.toDto(noteRepository.save(note));
    }

    @Override
    public void remove(Long id) {
        if (!noteRepository.existsById(id)) {
            throw new EntityNotFoundException(CANNOT_FIND_BY_ID + id);
        }

        noteRepository.deleteById(id);
    }

    private Note findById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(CANNOT_FIND_BY_ID + id));
    }
}
