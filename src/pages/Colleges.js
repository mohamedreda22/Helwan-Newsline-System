import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import { Container, Row, Col, Alert } from "react-bootstrap";
import "../styles/Collages.css";
import { Link } from "react-router-dom";
import artTheater from "../assets/images/art theater.jpeg";
import mainGate from "../assets/images/main gate.jpeg";
import university2 from "../assets/images/university2.jpeg";
import universityImage from "../assets/images/universityImage.jpeg";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);

  const fetchColleges = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/colleges"
      );
      setColleges(response.data);
    } catch (error) {
      console.error("Error fetching Colleges:", error);
      setErrorAlert(true);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  return (
    <>
      <Container fluid>
        <Navbar />
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={universityImage} className="d-block w-100" alt="جامعة حلوان" />
            </div>
            <div className="carousel-item">
              <img src={artTheater} className="d-block w-100" alt="مجمع الفنون والثقافة" />
            </div>
            <div className="carousel-item">
              <img src={mainGate} className="d-block w-100" alt="البوابة الرئيسية" />
            </div>
            <div className="carousel-item">
              <img src={university2} className="d-block w-100" alt="جامعة حلوان" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <Container>
          <div className="colleges">
            {errorAlert && (
              <Alert variant="danger" onClose={() => setErrorAlert(false)} dismissible>
                Error fetching colleges. Please try again later.
              </Alert>
            )}
            <Row className="justify-content-center">
              {colleges.map((college) => (
                <Col key={college.college_id} lg={3} md={4} sm={6}>
                  <div className="photo-item">
                    <Link to={`/colleges/${college.college_id}`}>
                      <img
                        src={college.college_icon}
                        alt={college.college_name}
                        className="img-fluid"
                      />
                    </Link>
                    <p>{college.college_name}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
        <Footer />
      </Container>
    </>
  );
}

export default Colleges;
