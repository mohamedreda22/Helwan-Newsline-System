import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/AdminNavBar.css";
import universityLogo from "../assets/images/universityLogo.png";

const AdminNavBar = () => {
  return (
    <Navbar dir="rtl" className="bg-white" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={universityLogo}
            className=""
            alt="University Logo"
            width="70"
            height="75"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="links  mr-auto">
            <Nav.Link as={Link} to="/addPublisher">إضافة ناشر</Nav.Link>
            <Nav.Link as={Link} to="/allPublishers">كل الناشرين</Nav.Link>
            <Nav.Link as={Link} to="/departments">الأقسام</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavBar;
