import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.png";
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <Navbar className={styles.NavBar} expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img src={logo} alt="logo" height="35"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-left">
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">All</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Today</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Important</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Completed</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Scheduled</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Overdue</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto text-left">
            <Nav.Link href="#signin">
              <i className="fas fa-sign-in-alt"></i>Sign in
            </Nav.Link>
            <Nav.Link href="#signup">
              <i className="fas fa-user-plus"></i>Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
