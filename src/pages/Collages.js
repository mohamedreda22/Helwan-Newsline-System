
import universityImage from "../assets/images/universityImage.jpeg";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import "../styles/Collages.css";
import { Link } from "react-router-dom";
import React from "react";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

const imageTextData = [
  { imageName: 'ryadya-banat.png', text: "تربية رياضية بنات", link: "/ryadyaBanat" },
  { imageName: 'ryadya-banen.png', text: "تربية رياضية بنين", link: "/ryadyabanen" },
  { imageName: 'ektesad.png', text: "اقتصاد منزلي", link: "/ektesad" },
  { imageName: 'fanaya.png', text: "تربية فنية", link: "/fanaya" },
  { imageName: 'gamela.png', text: "فنون جميلة", link: "/gamela" },
  { imageName: 'tamred.png', text: "تمريض", link: "/tamred" },
  { imageName: 'saydala.png', text: "صيدلة", link: "/sydala" },
  { imageName: 'olom.png', text: "علوم", link: "/olom" },
  { imageName: 'hasbat.png', text: "حاسبات", link: "/hasbat" },
  { imageName: 'tab.png', text: "طب", link: "/tab" },
  { imageName: 'music.png', text: "تربية موسيقية", link: "/ryadyaBanat" },
  { imageName: 'handsa-matrya.png', text: "هندسة (مطرية)", link: "/ryadyaBanat" },
  { imageName: 'handsa-helwan.png', text: "هندسة (حلوان)", link: "/ryadyaBanat" },
  { imageName: 'tarbya.png', text: "تربية", link: "/ryadyaBanat" },
  { imageName: 'adab.png', text: "أداب", link: "/ryadyaBanat" },
  { imageName: 'hokok.png', text: "حقوق", link: "/ryadyaBanat" },
  { imageName: 'khadma.png', text: "خدمة اجتماعية", link: "/ryadyaBanat" },
  { imageName: 'tgara.png', text: "تجارة", link: "/ryadyaBanat" },
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
                      src={images[item.imageName].default} 
                      alt={`Collage ${index + 1}`}
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
