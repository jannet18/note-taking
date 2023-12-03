import React from "react";
import NoteForm from "./NoteForm";
import { useNote } from "../hooks/useNote";

function EditNote({ onSubmit, onAddTag, availableTags }) {
  const note = useNote();
  return (
    <div>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
}

export default EditNote;
