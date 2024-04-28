//import universityLogo from "../assets/images/universityLogo.png";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="containerxxl">
      <footer className="text-center footer-container">
{/*         <div className="footer-logo">
          <img src={universityLogo} alt="universityLogo" />
        </div> */}
        <ul className="footer-links">
          <li>
            <Link to="/importantEvents" className="footer-links">
              اهم الاحداث{" "}
            </Link>
          </li>
          <li>
            <Link to="/articles" className="footer-links">
              اهم المقالات
            </Link>{" "}
          </li>
          <li>
            <Link to="/message" className="footer-links">
              عن رؤية الجامعة ورسالتها{" "}
            </Link>
          </li>
          <li>
            <Link to="/landingPage" className="footer-links">
              الصفحة الرئيسية
            </Link>
          </li>
        </ul>
        <p>
          مجلة تقدم لكم التحديث اليومي حول أحدث الأخبار والأحداث في جامعتنا ,
          نقدم تقارير شاملة وشمولية لكل الأنشطة والفعاليات التي تحدث داخل
          الحرم الجامعي
        </p>
        <div className="footer-social-icons">
          <Link to="/">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="/">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="/">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link to="/">
            <i className="fab fa-linkedin"></i>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
