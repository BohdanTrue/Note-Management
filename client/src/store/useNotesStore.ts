import axios from 'axios';
import { create, useStore } from 'zustand';
import { Note } from '../types/Note';
import { ErrorMessage } from '../types/Errors';

interface NotesStore {
  notes: Note[],
  count: number,
  errorMessage: ErrorMessage,
  createNote: (title: string) => void,
  updateNote: (id: number, updatedNote: Note) => void,
  deleteNote: (id: number) => void,
  setNotes: (notes: Note[]) => void,
  setErrorMessage: (errorMessage: ErrorMessage) => void,
  getAllNotes: () => void,
}

const BASE_URL = 'http://localhost:8081/api/notes'

const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  count: 0,
  errorMessage: ErrorMessage.None,

  setErrorMessage: (errorMessage: ErrorMessage) => {
    set(() => ({
      errorMessage: errorMessage,
    }));
  },

  createNote: async (title) => {
    try {
      const response = await axios.post(BASE_URL, { title: title });
      const newNote = response.data;
      
      set((state) => ({
        notes: [newNote, ...state.notes],
      }));
    } catch (error) {
      useNotesStore.getState().setErrorMessage(ErrorMessage.NoteExists)
    }
  },

  setNotes: (notes) => {
    set(() => ({
      notes: notes,
    }));
  },

  deleteNote: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      set((state) => ({
        notes: state.notes.filter(note => note.id != id),
      }));
    } catch (error) {
      console.error('Error removing note:', error);
    }
  },

  updateNote: async (id, updatedNote) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}`, updatedNote);

        const notes = useNotesStore.getState().notes;
        const filteredNotes = notes.filter(note => note.id !== id);

        const updatedNotes = [response.data, ...filteredNotes];

        useNotesStore.getState().setNotes(updatedNotes);
    } catch (error) {
        console.error('Error updating note:', error);
    }
  },


  getAllNotes: async () => {
    try {
      const response = await axios.get(BASE_URL);

      useNotesStore.getState().setNotes(response.data);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  }
}));

export default useNotesStore;
