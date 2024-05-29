package org.aionys.aionystesttask.repository;

import org.aionys.aionystesttask.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    boolean existsNoteByTitle(String title);
}
