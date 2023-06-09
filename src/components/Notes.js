import React, {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
  
  return (
    <div className="row">
        <h2>Your Notes</h2>

        {notes.map((note) => {
          return <Noteitem note={note}/>;
        })}
      </div>
  )
}

export default Notes
