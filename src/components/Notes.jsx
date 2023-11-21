import React from 'react';
import Note from './Note';

function Notes({notes}) {
  return (
    <div>
        {
           notes && notes?.map((note, id) => (
                <Note key={id} id ={note.id} title={note.title} content={note.content} tag={note.tag}/>
            ))
        }
    </div>
  )
}

export default Notes