import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import { useLocalStorage } from './components/useLocalStorage';

function App() {
  const [notes, setNotes] = useLocalStorage('notes', []);
  const [tags, setTags] = useLocalStorage('tags', []);


  const addNote = ({text}) => {
console.log(text);
  }


  // const Note = {
  //   id: String,
  // } & NoteData

  // const NoteData = {
  //   title: '',
  //   markdown: '',
  //   tags: []
  // }

  // const Tag = {
  //   id: '',
  //   label: '',
  // }
  return (
    <Container>
    <Routes>
      <Route path='/' element={<Notes notes={notes} handleAddNote={addNote}/>}/>
      <Route path='/new' element={<NewNote/>}/>
      <Route path='/:id'>
        <Route index element={<h2>Show</h2>}/>
        <Route path='edit' element={<h2>Edit</h2>}/>
      </Route>
      <Route path='/' element={<h2>hello</h2>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
    </Container>
  );
}

export default App;
