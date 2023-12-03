import React, { useRef, useState } from "react";
import { Col, Form, Stack, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidv4 } from "uuid";

function NoteForm({
  onAddTag,
  availableTags,
  onSubmit,
  title = "",
  markdown = "",
  tags = [],
}) {
  const titleRef = useRef(null);
  const markdownRef = useRef(null);
  const [selectedTags, setSelectedTags] = useState(tags);
  const navigate = useNavigate();

  function handleSubmit(e) {
    // console.log(e.target.value);
    e.preventDefault();
    onSubmit({
      title: titleRef.current.value,
      markdown: markdownRef.current.value,
      tags: [selectedTags],
    });
    navigate("..");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                ref={titleRef}
                defaultValue={title}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                onCreateOption={(label) => {
                  const newTag = { id: uuidv4(), label };
                  onAddTag(newTag);
                  setSelectedTags((prev) => [...prev, newTag]);
                  // console.log(...prev);
                }}
                value={selectedTags?.map((tag) => {
                  return {
                    label: tag?.label,
                    value: tag?.id,
                  };
                })}
                options={availableTags?.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                // converting form the value creatble react expects to what we will store locally
                // modify tags
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            required
            as="textarea"
            ref={markdownRef}
            rows={15}
            defaultValue={markdown}
          ></Form.Control>
        </Form.Group>
        <Stack direction="horizontal" gap={3} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}

export default NoteForm;
