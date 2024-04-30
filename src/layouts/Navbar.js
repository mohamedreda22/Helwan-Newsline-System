import {React,useState,useEffect} from "react";
import { Navbar, Nav, Container} from "react-bootstrap";
import { Link } from "react-router-dom";
import universityLogo from "../assets/images/universityLogo.png";
import "../styles/CustomNavbar.css";
import axios from "axios";
import Cookies from 'js-cookie';


const CustomNavbar = () => {
  const [userRole, setUserRole] = useState("");   
  const [profileAvatar, setProfileAvatar] = useState('');

  const handleExit=()=>{
    Cookies.remove('userRole');
    Cookies.remove('student_id');
    window.location.href = '/';
}
  useEffect(() => {
    const userRole = Cookies.get('userRole');
    setUserRole(userRole);
  }, []);

  useEffect(() => {
    const studentId = Cookies.get("student_id");
    if (studentId) {
      fetchAvatar(studentId); // Pass studentId as an argument
    }
  }, []);

  const fetchAvatar = (studentId) => { 
    axios.get(`http://localhost:9090/university/students/${studentId}`)
    .then((response) => {
      setProfileAvatar(response.data.student_image_path);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <Navbar expand="lg" bg="light" variant="light" className="custom-navbar"  style={{padding:"0px"}}>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" dir="rtl" className="collapse7">
          <Nav>
          {userRole === "STUDENT"  ?(
            <Nav.Link as={Link} to="/logout" className="nav-link logout-link" onClick={() => handleExit()}>
              تسجيل الخروج
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login" className="nav-link">
              تسجيل الدخول
            </Nav.Link>
          )}
          </Nav>

          <Nav className="me-auto custom-nav-links" >
            <Nav.Link as={Link} to="/landingpage" className="nav-link">
              الصفحة الرئيسية
            </Nav.Link>
            <Nav.Link as={Link} to="/colleges" className="nav-link">
              الكليات
            </Nav.Link>
            <Nav.Link as={Link} to="/articles" className="nav-link">
              أهم المقالات
            </Nav.Link>
            <Nav.Link as={Link} to="/posts" className="nav-link">
              آخر المنشورات
            </Nav.Link>
            <Nav.Link as={Link} to="/importantEvents" className="nav-link">
              الأحداث الهامة
            </Nav.Link>
            <Nav.Link as={Link} to="/videos" className="nav-link">
              آخر الفيديوهات
            </Nav.Link>
          </Nav>
          {userRole === "STUDENT" ? (
              <>
                <Nav.Link as={Link} to="/logout"  onClick={() => handleExit()}>
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="nav-link">
                <img src={profileAvatar} alt="Student Image" className="avatar" style={{scale:"60%"}}/>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link">
              </Nav.Link>
            )}
         
        </Navbar.Collapse>
        <Navbar.Brand className="navbar-brand" style={{scale:"120%"}} >
          <img src={universityLogo} className="logo" alt="University Logo" style={{marginTop:"20px"}} />
{/*           <div className="brand-info" style={{scale:"80%",marginBottom:"20px"}}>
            <h3 className="brand-title">مرحبًا بك في جامعة حلوان</h3>
            <p className="brand-subtitle">Welcome to Helwan University</p>
            <div className="location-info">
              <i className="fas fa-map-marker-alt"></i>
              <a href="https://maps.app.goo.gl/LeWb3aumn6avNL2W9" className="brand-location" target="_blank">
                عين حلوان - القاهرة - مصر
              </a>
            </div>
          </div> */}
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
