import universityLogo from "../assets/images/universityLogo.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="containerxxl">
      <nav class="navbar navbar-expand-lg bg-color-gray">
        <div class="container-fluid">
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search "
              aria-label="Search"
            />
            <span class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </form>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto p-2 justify-content-center ">
              <li class="nav-item ">
                <Link to="/" className="nav-link " aria-current="page">
                  اهم الاحداث
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link to="/" className="nav-link">
                  رياضة
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link to="/" className="nav-link">
                  اخر الاخبار
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link to="/" className="nav-link">
                  الكليات
                </Link>
              </li>
              <li class="nav-item ms-5 ">
                <Link to="/" className="nav-link active ">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li class="nav-item ms-5"></li>
            </ul>
          </div>
          <span>
            <Link to="/login" className="nav-link me-5 ">
              تسجيل الدخول
            </Link>
          </span>
          <Link to="/" class="navbar-brand" target="_blank" rel="noreferrer">
            <img
              src={universityLogo}
              className="logo navbar-brand"
              alt="University Logo"
              width="64"
              height="60"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
