package org.aionys.aionystesttask.mapper;

import org.aionys.aionystesttask.config.MapperConfig;
import org.aionys.aionystesttask.dto.NoteRequestDto;
import org.aionys.aionystesttask.dto.NoteResponseDto;
import org.aionys.aionystesttask.model.Note;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface NoteMapper {
    NoteResponseDto toDto(Note note);

    Note toModel(NoteRequestDto requestDto);
}
