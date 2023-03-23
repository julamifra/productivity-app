import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";

import appStyles from "../../App.module.css";
import styles from "../../styles/TasksPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { useHistory } from "react-router-dom";


function TasksPage() {
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasloaded] = useState(false);
  const { pathname } = useLocation();

  const history = useHistory();

  const queryParams = new URLSearchParams(window.location.search);
  const search = queryParams.get("search");

  const fetchTasks = async () => {
    try {
      const { data } = await axiosReq.get(`tasks/`);
      setTasks(data);
      setHasloaded(true);
    } catch (err) {
      console.log("error: ", err);
    }
  };


  useEffect(() => {
    setHasloaded(false);
    fetchTasks();
  }, [pathname]);

  const handleChange = async (event, taskId) => {
    const isChecked = event.target.checked;
    setTasks({
      ...tasks,
      results: tasks.results.map(e=> {
        if(taskId === e.id){
          return {...e, completed: isChecked};
        }
        return e;
      }),
    });
    try {
      const formData = new FormData();
      formData.append('important', isChecked);

      await axiosReq.put(`tasks/${taskId}`, formData );
      fetchTasks();
    } catch (err) {
      // setErrors(err.response?.data);
    }
  };

  const onClickDelete = async (event, taskId) => {
    try {
      await axiosReq.delete(`tasks/${taskId}` );
      fetchTasks();
    } catch (err) {
      // setErrors(err.response?.data);
    }
  }

  return (
    <Container>
      <ListGroup>
        {hasLoaded ? (
          <>
            {tasks.results.length ? (
              tasks.results.map((task) => (
                <ListGroup.Item action key={task.id} variant="primary">
                  <FormCheck type="checkbox" className="d-inline p-3" checked={task.completed} onChange={(e) => handleChange(e, task.id)}/>
                  {task.title}{" "}
                  {task.important ? (
                    <i className={`fas fa-flag ${styles.Important}`}></i>
                  ) : (
                    <i className={`fas fa-flag ${styles.NotImportant}`}></i>
                  )}
                  <i onClick={(e) => onClickDelete(e, task.id)} className={`fas fa-trash ${styles.NotImportant}`}></i>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item action variant="primary">
                <FormCheck type="checkbox" className="d-inline p-3" />
                Add a new task...
              </ListGroup.Item>
            )}
          </>
        ) : (
          <h1>loading...</h1>
        )}
      </ListGroup>
    </Container>
  );
}

export default TasksPage;
