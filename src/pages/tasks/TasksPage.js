import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";
import Pagination from 'react-bootstrap/Pagination';

import appStyles from "../../App.module.css";
import styles from "../../styles/TasksPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { useHistory } from "react-router-dom";

import welcomepage from "../../assets/welcomepage.jpg";


import {
  useCurrentUser
} from "../../contexts/CurrentUserContext";


function TasksPage() {
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasloaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  const history = useHistory();

  const queryParams = new URLSearchParams(window.location.search);
  // const search = queryParams.get("search");

  const fetchTasks = async (page) => {
    try {
      if(currentUser){
        const { data } = await axiosReq.get(`tasks/?owner__profile=${currentUser.profile_id}${page ? "&page="+page : ""}`);
        setTasks(data);
      }
      setHasloaded(true);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const mofidyTask = async (taskId, isChecked, isImportant) => {
    try{
      const titleTask = tasks.results.find(task=> task.id === taskId).title;
      const formData = new FormData();
      formData.append('title', titleTask);
      formData.append('completed', isChecked);
      formData.append('important', isImportant);
      await axiosReq.put(`tasks/${taskId}/`, formData );

      setTasks({
        ...tasks,
        results: tasks.results.map(e=> {
          if(taskId === e.id){
            return {...e, completed: isChecked, important: isImportant};
          }
          return e;
        }),
      });
      } catch (err) {
        // setErrors(err.response?.data);
      }
  };

  useEffect(() => {
    setHasloaded(false);
    fetchTasks();
  }, [pathname, currentUser]);

  const onClickCheckBox = async (event, task) => {
    event.preventDefault();
    try {
      const isChecked = event.target.checked;
    
      mofidyTask(task.id, isChecked, task.important);
      fetchTasks();
    } catch (err) {
      // setErrors(err.response?.data);
    }
  };

  const onClickDelete = async (event, taskId) => {
    event.preventDefault();
    try {
      await axiosReq.delete(`tasks/${taskId}` );
      fetchTasks();
    } catch (err) {
      // setErrors(err.response?.data);
    }
  }

  const onClickEdit = async (event, taskId) => {
    try {
      history.push({
        pathname: "/tasks/create",
        state: {
          taskId: taskId
        }
      });
    } catch (err) {
      // setErrors(err.response?.data);
    }
  }

  const onClickMarkAsImportant = async (event, task, isImportant) => {
    event.preventDefault();
    try {
      mofidyTask(task.id, task.completed, isImportant);
      fetchTasks();
    } catch (err) {
      // setErrors(err.response?.data);
    }
  }
  
  const getPageNumber = (strURL) => {
    const url = new URL(strURL);
    return url.searchParams.get("page");
  }

  return (
    <Container>
      {currentUser ? (
        <>
          <Pagination className="justify-content-center">
                <Pagination.Prev disabled={!tasks.previous} onClick={(e) => fetchTasks(getPageNumber(tasks.previous))}>Previous</Pagination.Prev>
                <Pagination.Next disabled={!tasks.next} onClick={(e) => fetchTasks(getPageNumber(tasks.next))}>Next</Pagination.Next>
          </Pagination>
          <ListGroup>
            {hasLoaded ? (
              <>
                {tasks.results.length ? (
                  tasks.results.map((task) => (
                    <ListGroup.Item key={task.id} variant={task.completed ? "success" : "primary"}>
                      <FormCheck type="checkbox" className="d-inline p-3" checked={task.completed} onChange={(e) => onClickCheckBox(e, task)}/>
                        <span className="font-weight-bold">{task.title}</span>
                        <div style={{ float: "right"}}>
                          {task.important ? (
                            <i onClick={(e) => onClickMarkAsImportant(e, task, false)} className={`fas fa-flag ${styles.Important}`}></i>
                          ) : (
                            <i onClick={(e) => onClickMarkAsImportant(e, task, true)} className={`fas fa-flag ${styles.NotImportant}`}></i>
                          )}
                          <i onClick={(e) => onClickDelete(e, task.id)} className={`fas fa-trash ${styles.NotImportant}`}></i>
                          <i onClick={(e) => onClickEdit(e, task.id)} className={`fas fa-edit ${styles.NotImportant}`}></i>
                        </div>
                        <p className="text-truncate" title={task.notes} style={{margin: 0}}><small>{task.notes}</small></p>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item variant="primary">
                    <a href="/tasks/create" className="d-inline p-3" ><i className="far fa-plus-square"></i>Add a new task...</a>
                  </ListGroup.Item>
                )}
              </>
            ) : (
              <h1>loading...</h1>
            )} 
          </ListGroup>
        </>
        ) : (
          <div>
            <div style={{paddingTop: "120px"}}>
              <img src={welcomepage} alt="welcompage" height="100%" width="100%" className="p-10" />
            </div>
            <div className="text-center p-5">
              <h2>Welcome to Producivity App!</h2>
              <p>You must be signed up to start using the app.</p>
            </div>
          </div>
        )}
    </Container>
  );
}

export default TasksPage;
