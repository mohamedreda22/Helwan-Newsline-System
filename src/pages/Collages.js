import universityImage from "../assets/images/universityImage.jpeg";
import ryadyaBanat from "../assets/images/ryadya-banat.png";
import ryadyabanen from "../assets/images/ryadya-banen.png";
import fanaya from "../assets/images/fanaya.png";
import ektesad from "../assets/images/ektesad.png";
import gamela from "../assets/images/gamela.png";
import tamred from "../assets/images/tamred.png";
import sydala from "../assets/images/saydala.png";
import olom from "../assets/images/olom.png";
import hasbat from "../assets/images/hasbat.png";
import tab from "../assets/images/tab.png";
import music from "../assets/images/music.png";
import handsaMatarya from "../assets/images/handsa-matrya.png";
import handsaHelwan from "../assets/images/handsa-helwan.png";
import Tarbya from "../assets/images/tarbya.png";
import adab from "../assets/images/adab.png";
import hokok from "../assets/images/hokok.png";
import khdma from "../assets/images/khadma.png";
import tgara from "../assets/images/tgara.png";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import "../styles/Collages.css";
import { Link } from "react-router-dom";
import React from "react";

const imageTextData = [
  { imageUrl: ryadyaBanat, text: "تربية رياضية بنات", link: "/ryadyaBanat" },
  { imageUrl: ryadyabanen, text: "تربية رياضية بنين", link: "/ryadyabanen" },
  { imageUrl: ektesad, text: "اقتصاد منزلي", link: "/ektesad" },
  { imageUrl: fanaya, text: "تربية فنية", link: "/fanaya" },
  { imageUrl: gamela, text: "فنون جميلة", link: "/gamela" },
  { imageUrl: tamred, text: "تمريض", link: "/tamred" },
  { imageUrl: sydala, text: "صيدلة", link: "/sydala" },
  { imageUrl: olom, text: "علوم", link: "/olom" },
  { imageUrl: hasbat, text: "حاسبات", link: "/hasbat" },
  { imageUrl: tab, text: "طب", link: "/tab" },
  { imageUrl: music, text: "تربية موسيقية", link: "/ryadyaBanat" },
  { imageUrl: handsaMatarya, text: "هندسة (مطرية)", link: "/ryadyaBanat" },
  { imageUrl: handsaHelwan, text: "هندسة (حلوان)", link: "/ryadyaBanat" },
  { imageUrl: Tarbya, text: "تربية", link: "/ryadyaBanat" },
  { imageUrl: adab, text: "أداب", link: "/ryadyaBanat" },
  { imageUrl: hokok, text: "حقوق", link: "/ryadyaBanat" },
  { imageUrl: khdma, text: "خدمة اجتماعية", link: "/ryadyaBanat" },
  { imageUrl: tgara, text: "تجارة", link: "/ryadyaBanat" },
];
function Collages() {
  return (
    <>
      <Navbar />
      <div className="container-fluid px-0">
        <img
          src={universityImage}
          alt="University Image"
          className="university-image"
        />
        <div className="container">
          <div className="row justify-content-center">
            {/* Map through the imageTextData array and render each item */}
            {imageTextData.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div className="photo-item">
                  <Link to={item.link}>
                    <img
                      src={item.imageUrl}
                      alt={`Image ${index + 1}`}
                      className="img-fluid"
                    />
                  </Link>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Collages;
