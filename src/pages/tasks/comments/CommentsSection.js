import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { useHistory, useLocation } from "react-router-dom";
import { axiosReq } from "../../../api/axiosDefault";
import appStyles from "../../../App.module.css";
import styles from "../../../styles/CommentCreateEditForm.module.css";


import {
  useCurrentUser
} from "../../../contexts/CurrentUserContext";
import Comment from "./comment";


function CommentsSection() {
  const [comments, setComments] = useState({ results: [] });
  const [contentComment, setComment] = useState("");
  const location = useLocation();
  const currentUser = useCurrentUser();

  const taskId = location?.state?.taskId;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      if(currentUser){
        const { data } = await axiosReq.get(`comments/?task=${taskId}`);
        console.log("comments: ", data);
        setComments(data);
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('task', taskId);
    formData.append('content', contentComment);
    try {
      const { data } = await axiosReq.post("/comments/", formData);
      console.log("Response POST comments: ", data);
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className={appStyles.Content}>
      <Form className="mt-2" onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            <Form.Control
              className={styles.Form}
              placeholder="my comment..."
              as="textarea"
              value={contentComment}
              onChange={handleChange}
              rows={2}
            />
          </InputGroup>
        </Form.Group>
        <button
          className={`${styles.Button} btn d-block ml-auto`}
          type="submit"
        >
          comment
        </button>
      </Form>
      <div>
        {comments.results.length ? (
          comments.results.map(comment => (
            <Comment key={comment.id} {...comment} />
          ))
        ) : (
          <span>No comments...</span>
        )}
      </div>
    </Container>
  );
}

export default CommentsSection;
