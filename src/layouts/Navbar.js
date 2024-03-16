import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import universityLogo from "../assets/images/universityLogo.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const CustomNavbar = () => {
  return (
    <div className="containerxxl">
      <Navbar expand="lg" bg="color-gray">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Form className="d-flex ms-auto" role="search">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="light">
                <i className="fas fa-search"></i>
              </Button>
            </Form>
            <Nav className="mx-auto" style={{ fontSize: "22px" }}>
              <Nav.Link as={Link} to="/" className="nav-link ms-5">
                اهم الاحداث
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="nav-link ms-5">
                رياضة
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="nav-link ms-5">
                اخر الاخبار
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="nav-link ms-5">
                الكليات
              </Nav.Link>
              <Nav.Link as={Link} to="/" className="nav-link ms-5 active">
                الصفحة الرئيسية
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/login" className="nav-link me-5">
                تسجيل الدخول
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Link to="/" className="navbar-brand">
            <img
              src={universityLogo}
              className="logo"
              alt="University Logo"
              width="64"
              height="60"
            />
          </Link>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
