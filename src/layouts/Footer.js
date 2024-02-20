import universityLogo from "../assets/images/logo.png";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="containerxxl">
        <footer class="text-center footer-container">
          <div class="footer-logo">
            <img src={universityLogo} alt="universityLogo" />
          </div>
          <ul class="footer-links">
            <li>
              <Link to="/" className="footer-links">
                اهم الاحداث{" "}
              </Link>
            </li>
            <li>
              <Link to="/" className="footer-links">
                اهم المقالات
              </Link>{" "}
            </li>
            <li>
              <Link to="/" className="footer-links">
                عن رؤية الجامعة ورسالتها{" "}
              </Link>
            </li>
            <li>
              <Link to="/" className="footer-links">
                الصفحة الرئيسية
              </Link>
            </li>
          </ul>
          <p>
            مجلة تقدم لكم التحديث اليومي حول أحدث الأخبار والأحداث في جامعتنا ,
            نقدم تقارير شاملة وشمولية لكل الأنشطة والفعاليات التي تحدث داخل
            الحرم الجامعي
          </p>
          <div class="footer-social-icons">
            <Link to="/">
              <i class="fab fa-facebook-f"></i>
            </Link>
            <Link to="/">
              <i class="fab fa-twitter"></i>
            </Link>
            <Link to="/">
              <i class="fab fa-instagram"></i>
            </Link>
            <Link to="/">
              <i class="fab fa-linkedin"></i>
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
