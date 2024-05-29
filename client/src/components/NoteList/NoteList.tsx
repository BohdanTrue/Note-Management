import { Note } from "../../types/Note";
import style from "./NoteList.module.scss"
import { NoteItem } from "../NoteItem/NoteItem";

interface Props {
  notes: Note[];
  onRename: (note: Note, newTitle: string) => Promise<void>;
  onDelete: (noteId: number) => void;
  onChangeStatus: (note: Note) => void
}

export const NoteList:React.FC<Props> = ({ notes, onRename, onDelete, onChangeStatus }) => {
  return (
    <div className={style.noteList}>
      <ul>
        { notes.map(note => (
          <NoteItem 
            note={note}
            onRename={onRename}
            onDelete={onDelete}
            onChangeStatus={onChangeStatus}
            key={note.id}
          />
        ))}
      </ul>
    </div>
  )
};
