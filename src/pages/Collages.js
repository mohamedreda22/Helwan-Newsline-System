import universityImage from "../assets/images/universityImage.jpeg";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Collages.css";
import { Link } from "react-router-dom";
import React from "react";
import artTheater from "../assets/images/art theater.jpeg";
import mainGate from "../assets/images/main gate.jpeg";
import university2 from "../assets/images/university2.jpeg";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("../assets/images", false, /\.(png|jpe?g|svg)$/)
);

const imageTextData = [
  { imageName: "ryadya-banat.png", text: "تربية رياضية بنات" },
  { imageName: "ryadya-banen.png", text: "تربية رياضية بنين" },
  { imageName: "ektesad.png", text: "اقتصاد منزلي" },
  { imageName: "fanaya.png", text: "تربية فنية" },
  { imageName: "gamela.png", text: "فنون جميلة" },
  { imageName: "tamred.png", text: "تمريض" },
  { imageName: "saydala.png", text: "صيدلة" },
  { imageName: "olom.png", text: "علوم" },
  { imageName: "hasbat.png", text: "حاسبات" },
  { imageName: "tab.png", text: "طب" },
  { imageName: "music.png", text: "تربية موسيقية" },
  { imageName: "handsa-matrya.png", text: "هندسة (مطرية)" },
  { imageName: "handsa-helwan.png", text: "هندسة (حلوان)" },
  { imageName: "tarbya.png", text: "تربية" },
  { imageName: "adab.png", text: "أداب" },
  { imageName: "hokok.png", text: "حقوق" },
  { imageName: "khadma.png", text: "خدمة اجتماعية" },
  { imageName: "tgara.png", text: "تجارة" },
];

// Dynamically generate the link based on imageName
const smartImageTextData = imageTextData.map((item) => ({
  ...item,
  link: `/${item.imageName.split(".")[0]}`,
}));

function Collages() {
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
        <Row className="justify-content-center">
              {/* Map through the imageTextData array and render each item */}
              {imageTextData.map((item, index) => (
                <Col key={index} lg={3} md={6} sm={6} xs={6}>
                  <div className="photo-item">
                    <Link to={item.link}>
                      <img src={images[item.imageName]} alt={`Collage ${index + 1}`} className="img-fluid" />
                    </Link>
                    <p>{item.text}</p>
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

export default Collages;
// import { useState, useEffect } from "react";
// import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Footer from "../layouts/Footer";
// import Navbar from "../layouts/Navbar";
// import universityImage from "../assets/images/universityImage.jpeg";
// import "../styles/Collages.css";

// function Collages() {
//   const [colleges, setColleges] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:9090/university/colleges")
//       .then((response) => {
//         setColleges(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching colleges:", error);
//       });
//   }, []);

//   return (
//     <Container fluid>
//       {/* Navbar */}
//       <Navbar />

//       {/* Carousel */}
//       <div
//         id="carouselExampleAutoplaying"
//         className="carousel slide"
//         data-bs-ride="carousel"
//       >
//         <div className="carousel-inner">
//           <div className="carousel-item active">
//             <img
//               src={universityImage}
//               className="d-block carousel_image w-100"
//               alt="جامعة حلوان"
//             />
//           </div>
//           {/* Add more carousel items here if needed */}
//         </div>
//         {/* Add carousel controls here if needed */}
//       </div>

//       <div className="container-fluid px-0">
//         <div className="row justify-content-center">
//           {/* Map over the colleges array and render each college */}
//           {colleges.map((college, index) => (
//             <div key={index} className="col-lg-3 col-md-4 col-sm-6">
//               <div className="photo-item">
//                 <Link to={college.link}>
//                   <img
//                     src={college.college_icon}
//                     alt={`College ${index + 1}`}
//                     className="img-fluid"
//                   />
//                 </Link>
//                 <p>{college.college_name}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </Container>
//   );
// }

// export default Collages;
