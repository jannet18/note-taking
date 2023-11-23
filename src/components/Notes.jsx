import React, { useMemo, useState } from 'react';
import Note from './Note';
import { Row, Col, Stack, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';

function Notes({notes, availableTags}) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [title, setTitle] = useState('');

    const filteredNotes = useMemo(() => {
        return notes?.filter(note => {
            return (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) 
            && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)
            ))
        })
    }, [title, selectedTags, notes ])
  return (
  <>
        <Row className='align-items-centers mb-4'>
            <Col>
            <h1>Notes</h1>
            </Col>
            <Col xs='auto'>
                <Stack gap={2} direction='horizontal'>
                    <Link to='/new'>
                        <Button variant='primary'>Create</Button>
                    </Link>
                    <Button variant='outline-secondary'>Edit Tags</Button>
                </Stack>
            </Col>
        </Row>
        <Form>
            <Row className='mb-4'>
                <Col>
                <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                >
                </Form.Control>  
                </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId='title'>
                <Form.Label >Tags</Form.Label>
                <ReactSelect 
                value={selectedTags?.map((tag) => {
                    return {
                        label: tag.label, value: tag.id
                    }
                })}
                options={availableTags?.map((tag) => {
                    return {label: tag.label, value: tag.id}
                })}
                // converting form the value creatble react expects to what we will store locally
                // modify tags
                onChange={tags => {
                    setSelectedTags(tags.map(tag => {
                       return {label: tag.label, id: tag.value} 
                    }))
                }}
                isMulti/>
            </Form.Group>
                </Col>
            </Row>
        </Form>
        <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
            {filteredNotes?.map((note, id) => (
                <Col key={note?.id} id={id}>
                    <Note key={note?.id} id={note?.id} title={note?.title} tag={note?.tag}/>
                </Col>
            ))}
        </Row>
        </>
  )
}

export default Notes