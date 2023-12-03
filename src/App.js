import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import useLocalStorage from "./components/useLocalStorage";
import { useMemo } from "react";
import NoteLayout from "./components/NoteLayout";
import { v4 as uuidv4 } from "uuid";
import NoteCard from "./components/NoteCard";
import EditNote from "./components/EditNote";

function App() {
  const [notes, setNotes] = useLocalStorage("notes", {
    key: "",
    initialValue: "",
  });
  const [tags, setTags] = useLocalStorage("tags", []);

  const notesWithTags = useMemo(() => {
    return notes?.map((note) => {
      const tagsForNote = tags?.filter(
        (tag) => note?.tagIds && note?.tagIds.includes(tag?.id)
      );
      return { ...note, tags: tagsForNote };
    });
  }, [notes, tags]);

  function onCreateNote(tags, ...data) {
    setNotes((prevNotes) => {
      const newNote = Array.isArray(prevNotes)
        ? [
            ...prevNotes,
            {
              ...data,
              id: uuidv4(),
              tagIds: Array.isArray(tags) ? tags?.map((tag) => tag?.id) : [],
            },
          ]
        : [notes];
      return newNote;
    });
  }

  function addTag(tag) {
    setTags((prev) => {
      const newTag = Array.isArray(prev) ? [...prev, tag] : [tag];
      return newTag;
    });
  }

  function onUpdateNote(id, tags, ...data) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note?.id === id) {
          return {
            ...note,
            ...data,
            id: uuidv4(),
            tagIds: Array.isArray(tags) ? tags?.map((tag) => tag?.id) : [],
            // tagIds: tags?.map((tag) => tag.id),
          };
        } else {
          return note;
        }
      });
    });

    function onDeleteNote(id) {
      setNotes((prevNotes) => {
        return prevNotes.filter((note) => note?.id !== id);
      });
    }
    // setNotes((prevNotes) => {
    //   const updateNote = Array.isArray(prevNotes)
    //     ? [
    //         ...prevNotes,
    //         {
    //           ...data,
    //           id: uuidv4(),
    //           tagsIds: tags.map((tag) => tag?.id),
    //         },
    //       ]
    //     : [notes];
    //   if (note.id === id) {
    //     return updateNote;
    //   } else {
    //     return updateNote;
    //   }
    // });
  }
  return (
    <Container>
      <Routes>
        <Route
          path="/"
          element={<Notes notes={notesWithTags} />}
          availableTags={tags}
          notes={notes}
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<NoteCard onDeleteNote={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="/" element={<h2>hello</h2>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
