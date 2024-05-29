import { useCallback, useEffect, useRef, useState } from 'react';
import { Note } from '../../types/Note';
import DeleteIcon from '../../images/delete-icon.svg'

interface Props {
  note: Note;
  onRename: (note: Note, newTitle: string) => Promise<void>;
  onDelete: (noteId: number) => void;
  onChangeStatus: (note: Note) => void;
}


export const NoteItem:React.FC<Props> = ({ note, onRename, onDelete, onChangeStatus }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const newNoteTitle = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (newNoteTitle.current) {
      newNoteTitle.current.focus();
    }
  })

  const handleSuccessfullEdit = useCallback(() => {
    onRename(note, newTitle);
    setIsEditing(false);
  }, [newTitle])

  const handlePressEsc = useCallback((event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(note.title);
    }
  }, [])

  return (
    <div className={`note ${note.isCompleted ? 'completed' : ''}`} key={note.id}>
      <label className='note__status-label'>
        <input 
          type="checkbox" 
          className='note__status' 
          checked={note.isCompleted}
          onChange={() => onChangeStatus(note)}
        />
      </label>
      {isEditing ? (
        <form onSubmit={event => {
          event.preventDefault();
          handleSuccessfullEdit();
          }}>
          <input 
            type="text" 
            className='note__title-field'
            placeholder='Enter your note'
            ref={newNoteTitle}
            value={newTitle.trim()}
            onChange={event => setNewTitle(event.target.value)}
            onBlur={handleSuccessfullEdit}
            onKeyDown={handlePressEsc}
          />
        </form>
      ) : (
        <>
          <span 
            className='note__title' 
            onDoubleClick={() => setIsEditing(true)}>
              {note.title}
          </span>
          <img src={DeleteIcon} alt="image" className='note__remove' onClick={() => onDelete(note.id)}/>
        </>
      )}
    </div>
  );
};
