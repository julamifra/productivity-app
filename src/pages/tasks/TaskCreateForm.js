import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";

import {
  useCurrentUser
} from "../../contexts/CurrentUserContext";

import CommentsSection from "./comments/CommentsSection";


function TaskCreateForm() {
  const [errors, setErrors] = useState({});

  const [taskData, setTaskData] = useState({
    title: "",
    notes: "",
    important: false,
  });
  const { title, notes, important } = taskData;

  const history = useHistory(null);
  const location = useLocation();
  const currentUser = useCurrentUser();

  const taskId = location?.state?.taskId;


  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      if(currentUser && taskId){
        const { data } = await axiosReq.get(`tasks/${taskId}/?owner__profile=${currentUser.profile_id}`);
        setTaskData(data);
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };

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
      if(taskId){
        await axiosReq.put(`tasks/${taskId}/`, formData );
      } else {
        await axiosReq.post('tasks/', formData);
      }
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
          placeholder={"Title (50 characters max)"}
          maxLength={"50"}
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
          placeholder={"Notes (500 characters max)"}
          maxLength={"500"}
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
          checked={important}
          onChange={()=> {}}
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
        {taskId? "edit" : "create"}
      </Button>
    </div>
  );


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Container className={appStyles.Content}>{textFields}</Container>
      </Form>
      <div className="p-2"></div>
      {taskId ? (<CommentsSection/>) : (<></>)}
    </div>
  );
}

export default TaskCreateForm;
