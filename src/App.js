import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import useLocalStorage from "./components/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [notes, setNotes] = useLocalStorage("notes", {
    key: "",
    initialValue: "",
  });
  const [tags, setTags] = useLocalStorage("tags", []);

  const notesWithTags = useMemo(() => {
    return notes?.map((note) => {
      const tagsForNote = tags?.filter(
        (tag) => note?.tagsIds && note?.tagsIds.includes(tag?.id)
      );
      return { ...note, tags: tagsForNote };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }) {
    setNotes((prevNotes) => {
      const newNote = Array.isArray(prevNotes)
        ? [
            ...prevNotes,
            {
              ...data,
              id: uuidv4(),
              tagsIds: tags.map((tag) => tag?.id),
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
        <Route path="/:id">
          <Route index element={<h2>Show</h2>} />
          <Route path="edit" element={<h2>Edit</h2>} />
        </Route>
        <Route path="/" element={<h2>hello</h2>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
