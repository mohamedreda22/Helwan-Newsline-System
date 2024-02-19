import universityImage from "../assets/images/universityImage.jpeg";
import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";
import "../styles/Collages.css";
import { Link } from "react-router-dom";
import React from "react";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => 
    { images[item.replace('./', '')] = r(item);
   });
  return images;
}

const images = importAll(require.context('../assets/images', false, /\.(png|jpe?g|svg)$/));

const imageTextData = [
  { imageName: 'ryadya-banat.png', text: "تربية رياضية بنات" },
  { imageName: 'ryadya-banen.png', text: "تربية رياضية بنين" },
  { imageName: 'ektesad.png', text: "اقتصاد منزلي" },
  { imageName: 'fanaya.png', text: "تربية فنية" },
  { imageName: 'gamela.png', text: "فنون جميلة" },
  { imageName: 'tamred.png', text: "تمريض" },
  { imageName: 'saydala.png', text: "صيدلة" },
  { imageName: 'olom.png', text: "علوم" },
  { imageName: 'hasbat.png', text: "حاسبات" },
  { imageName: 'tab.png', text: "طب" },
  { imageName: 'music.png', text: "تربية موسيقية" },
  { imageName: 'handsa-matrya.png', text: "هندسة (مطرية)" },
  { imageName: 'handsa-helwan.png', text: "هندسة (حلوان)" },
  { imageName: 'tarbya.png', text: "تربية" },
  { imageName: 'adab.png', text: "أداب" },
  { imageName: 'hokok.png', text: "حقوق" },
  { imageName: 'khadma.png', text: "خدمة اجتماعية" },
  { imageName: 'tgara.png', text: "تجارة" },
];

// Dynamically generate the link based on imageName
const smartImageTextData = imageTextData.map(item => ({
  ...item,
  link: `/${item.imageName.split('.')[0]}`,
}));


function Collages() {
  return (
    <>
      <Navbar />
      <div className="container-fluid px-0">
        <img
          src={images['universityImage.jpeg']}
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
                      src={images[item.imageName]} 
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
