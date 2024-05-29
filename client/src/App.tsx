import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { NoteList } from './components/NoteList/NoteList';
import { Header } from './components/Header/Header';
import { Note } from './types/Note';
import { Pagination } from './components/Pagination/Pagination';
import { Errors } from './components/Errors/Errors';
import { ErrorMessage } from './types/Errors';
import useNotesStore from './store/useNotesStore';

const NOTES_PER_PAGE = 5;

function App() {
  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasError, setHasError] = useState<boolean>(false);
  const setErrorMessage = useNotesStore(state => state.setErrorMessage)
  const createNote = useNotesStore(state => state.createNote);
  const updateNote = useNotesStore(state => state.updateNote);
  const deleteNote = useNotesStore(state => state.deleteNote);
  const getAllNotes = useNotesStore(state => state.getAllNotes);
  const { notes } = useNotesStore();
  const { errorMessage } = useNotesStore();

  const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);
  const lastNoteIndex = currentPage * NOTES_PER_PAGE;
  const firstNoteIndex = lastNoteIndex - NOTES_PER_PAGE;
  const currentNotes = notes.slice(firstNoteIndex, lastNoteIndex);
  
  const handleSubmit = useCallback(async(event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim()) {
      try {
        if (title.trim().length < 4) {
          setErrorMessage(ErrorMessage.TitleLess);
          return;
        }
        if (title.trim().length > 60) {
          setErrorMessage(ErrorMessage.TitleMore);
          return;
        }
        
        createNote(title);
        setTitle('');
      } catch (error) {
        setErrorMessage(ErrorMessage.NoteExists)
        throw new Error(`Cannot create note. Error message: ${error}`);
      }
    }
  }, [title])

  const handleDelete = useCallback(async(noteId: number) => {
    try {
      deleteNote(noteId);
    } catch (error) {
      throw new Error(`Cannot delete note. Error message: ${error}`);
    }
  }, [])

  const handleRename = async(note: Note, newTitle: string) => {
    const updatedNote = {...note, title: newTitle}
    const {title: curTitle, id} = note;

    if (!newTitle) {
      handleDelete(id);
      return;
    }
    if (newTitle !== curTitle) {
      try {
        if (newTitle.trim().length < 4) {
          setErrorMessage(ErrorMessage.TitleLess);
          return;
        }
        if (newTitle.trim().length > 60) {
          setErrorMessage(ErrorMessage.TitleMore);
          return;
        }

        updateNote(id, updatedNote)
      } catch (error) {
        setErrorMessage(ErrorMessage.NoteExists)
        throw new Error(`Cannot update note. Error message: ${error}`);
      }
    }
}

  const handleChangeStatus = useCallback(async(note: Note) => {
    const { isCompleted, id } = note;

    try {
      updateNote(id, {...note, isCompleted: !isCompleted})
      
    } catch (error) {
      throw new Error(`Cannot change status in note. Error message: ${error}`);
    }
  }, [])

  useEffect(() => {
    getAllNotes()
  }, []);

  return (
    <div className='container'>
      <div>  
        <Header
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
        />
        <NoteList 
          notes={currentNotes}
          onRename={handleRename}
          onDelete={handleDelete}
          onChangeStatus={handleChangeStatus}
        /> 
        {notes.length > 5 && (
          <Pagination 
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage} 
        />
        )}
        <Errors
          currError={errorMessage}
          setCurrError={setErrorMessage}
          hasError={hasError}
          setHasError={setHasError}
        />
      </div>
    </div>
  );
}

export default App;
