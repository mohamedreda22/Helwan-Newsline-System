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

            <div className="search" >
                <div className="search-box">
                    <div className="search-field" >
                        <input placeholder="Search..." className="input" type="text" />
                        <div className="search-box-icon" dir="rtl">
                            <button className="btn-icon-content">
                                <i className="search-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
                                        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#fff"></path>
                                    </svg>
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
