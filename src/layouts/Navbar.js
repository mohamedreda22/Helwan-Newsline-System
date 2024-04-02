import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import universityLogo from "../assets/images/universityLogo.png";
import "../styles/CustomNavbar.css";

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light" className="custom-navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" dir="rtl" className="collapse7">
          <Nav>
            <Nav.Link as={Link} to="/login" className="nav-link">تسجيل الدخول</Nav.Link>
          </Nav>
          <Nav className="me-auto custom-nav-links" >
            <Nav.Link as={Link} to="/landingPage" className="nav-link">الصفحة الرئيسية</Nav.Link>
            <Nav.Link as={Link} to="/collages" className="nav-link">الكليات</Nav.Link>
            <Nav.Link as={Link} to="/news" className="nav-link">آخر الأخبار</Nav.Link>
            <Nav.Link as={Link} to="/sports" className="nav-link">رياضة</Nav.Link>
            <Nav.Link as={Link} to="/events" className="nav-link">اهم الأحداث</Nav.Link>
          </Nav>
          <Form className="d-flex me-3" dir="rtl">
            <FormControl type="search" placeholder="ابحث هنا" className="me-2" aria-label="Search" />
            <Button variant="primary"><i className="fas fa-search"></i></Button>
          </Form>
        </Navbar.Collapse>
        <Navbar.Brand  className="navbar-brand">
          <img src={universityLogo} className="logo" alt="University Logo" />
          <div className="brand-info">
            <h3 className="brand-title">مرحبًا بك في جامعة حلوان</h3>
            <p className="brand-subtitle">Welcome to Helwan University</p>
            <div className="location-info">
              <i className="fas fa-map-marker-alt"></i>
              <a href="https://maps.app.goo.gl/LeWb3aumn6avNL2W9" className="brand-location" target="_blank">عين حلوان - القاهرة - مصر</a>
            </div>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
