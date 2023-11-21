import React, {useRef, useState}  from 'react';
import { Col, Form, Stack, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';


function NoteForm({onSubmit}) {
    const titleRef = useRef(null);
    const markdownRef = useRef(null);
    const [selectedTags, setSelectedTags] = useState([]);
    // const tagRef = useRef([
    //     {
    //         id: '',
    //         label: '',
    //     }
    // ]);
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    // const [tag, setTag] = useState([]);

    function handleSubmit (e) {
        // console.log(e.target.value);
        e.preventDefault();
        const title = titleRef.current.value;
        const markdown = markdownRef.current.value;
        const tag = [];
    }
    // function handleSaveClick(){
    //     handleAddNote();
    // }

  return (

  <Form onSubmit={handleSubmit}>
    <Stack gap={4}>
        <Row>
            <Col>
            <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control required ref={titleRef}></Form.Control>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId='title'>
                <Form.Label >Tags</Form.Label>
                <CreatableReactSelect value={selectedTags.map((tag) => {
                    return {
                        label: tag.label, value: tag.id
                    }
    
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
        <Form.Group controlId='markdown'>
                <Form.Label>Body</Form.Label>
                <Form.Control required as='textarea' ref={markdownRef} rows={15}></Form.Control>

            </Form.Group>
            <Stack direction='horizontal' gap={3} className='justify-content-end'>
                <Button type='submit' variant='primary' >Save</Button>
                <Link to='..'>
                <Button type='button' variant='outline-secondary'>Cancel</Button>
                </Link> 
            </Stack>
    </Stack>
  </Form>
    )
}

export default NoteForm