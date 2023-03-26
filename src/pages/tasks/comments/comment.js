import React from "react";
import { Media } from "react-bootstrap";
import styles from "../../../styles/Comment.module.css";

const Comment = (props) => {
  const { owner, updated_at, content } = props;

  return (
    <div>
      <hr />
      <Media>
        <Media.Body className="align-self-center">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          <p className="ml-2 mb-0">{content}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;