import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminNavBar.css";
import universityLogo from "../assets/images/universityLogo.png";

const AdminNavBar = () => {
  return (
    <>
      <Navbar dir="rtl" className="bg-white" bg="light" data-bs-theme="light">
        <Container>
        <Nav className="navlinks">

          <Link to="/" class="navbar-brand" target="_blank" rel="noreferrer">
            <img
              src={universityLogo}
              className="logo navbar-brand"
              alt="University Logo"
              width="54"
              height="60"
            />
          </Link>
            <Nav.Link Link to="/" >إضافة ناشر</Nav.Link>
            <Nav.Link Link to="/" >كل الناشرين</Nav.Link>
            <Nav.Link Link to="/" >الاقسام</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavBar;
