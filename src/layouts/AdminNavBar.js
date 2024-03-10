import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
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
            <Nav.Link href="#addPublisher">إضافة ناشر</Nav.Link>
            <Nav.Link href="#allPublishers">كل الناشرين</Nav.Link>
            <Nav.Link href="#departments">الأقسام</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavBar;
