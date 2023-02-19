import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import styles from "../../styles/TaskCreateEditForm.module.css";

function TaskCreateForm() {
  const [errors, setErrors] = useState({});

  const [taskData, setTaskData] = useState({
    title: "",
    content: "",
    important: false,
  });
  const { title, content, important } = taskData;

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChecked = (event) => {
    setTaskData({
      ...taskData,
      important: event.target.checked,
    });
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Important"
          value={important}
          onClick={handleChecked}
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Container className={appStyles.Content}>{textFields}</Container>
    </Form>
  );
}

export default TaskCreateForm;
