import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import styles from "../../styles/TaskCreateEditForm.module.css";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";

function TaskCreateForm() {
  const [errors, setErrors] = useState({});

  const [taskData, setTaskData] = useState({
    title: "",
    notes: "",
    important: false,
  });
  const { title, notes, important } = taskData;

  const history = useHistory(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('notes', notes);
    formData.append('important', important);

    try {
        const { data } = await axiosReq.post('tasks/', formData);
        console.log("dataaa: ", data);
        history.push(`/`)
    } catch(err) {
        if (err.response?.status !== 401) {
            setErrors(err.response?.data);
        }
    }
  }

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
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="notes"
          value={notes}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.notes?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Container className={appStyles.Content}>{textFields}</Container>
    </Form>
  );
}

export default TaskCreateForm;
