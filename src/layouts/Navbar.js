import universityLogo from "../assets/images/universityLogo.png";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="containerxxl">
      <nav className="navbar navbar-expand-lg bg-color-gray">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto p-2 justify-content-center ">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" activeClassName="active" exact>
                  اهم الاحداث
                </NavLink>
              </li>
              <li className="nav-item ms-5">
                <NavLink to="/sports" className="nav-link" activeClassName="active">
                  رياضة
                </NavLink>
              </li>
              <li className="nav-item ms-5">
                <NavLink to="/news" className="nav-link" activeClassName="active">
                  اخر الاخبار
                </NavLink>
              </li>
              <li className="nav-item ms-5">
                <NavLink to="/colleges" className="nav-link" activeClassName="active">
                  الكليات
                </NavLink>
              </li>
              <li className="nav-item ms-5">
                <NavLink to="/" className="nav-link" activeClassName="active">
                  الصفحة الرئيسية
                </NavLink>
              </li>
              <li className="nav-item ms-5"></li>
            </ul>
          </div>
          <span>
            <NavLink to="/login" className="nav-link me-5" activeClassName="active">
              تسجيل الدخول
            </NavLink>
          </span>
          <NavLink to="/" className="navbar-brand" target="_blank" rel="noreferrer">
            <img
              src={universityLogo}
              className="logo navbar-brand"
              alt="University Logo"
              width="64"
              height="60"
            />
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
