import React from 'react';
import universityLogo from "../assets/images/logo.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const NavbarSource = () => {

    const handleExit=()=>{
      Cookies.remove('userRole');
        window.location.href = '/';
    }
    return ( 
        <div className="containerxxl" style={{marginBottom:"-10px",marginTop:"-30px"}}>
        <nav class="navbar navbar-expand-lg bg-color-gray">
          <div class="container-fluid">
            
            <button  
            style={{ color:"white", 
                    backgroundColor:"rgb(16, 16, 39)",
                   borderRadius:"15px",
                   borderBlock:"white",
                   width:"150px",
                   height:"50px"
                   }}
                   onClick={() => handleExit()}
                   
                   > 
            تسجيل الخروج </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mx-auto p-2 justify-content-center ">
                 
              <li class="nav-item ms-5">
                  <Link to="/addCollege" className="nav-link">
                    اضافة كلية  
                  </Link>
                </li>                
                <li class="nav-item ms-5">
                  <Link to="/showDepartments" className="nav-link">
                    الاقسام  
                  </Link>
                </li>
                <li class="nav-item ms-5">
                  <Link to="/allsources" className="nav-link">
                     كل الناشرين
                  </Link>
                </li>
                <li class="nav-item ms-5 ">
                  <Link to="/source" className="nav-link active ">
                       اضافة ناشر
                  </Link>
                </li>
                <li class="nav-item ms-5"></li>
              </ul>
            </div>
           
            <Link to="/" class="navbar-brand" target="_blank" rel="noreferrer">
              <img
                src={universityLogo}
                className="logo navbar-brand"
                alt="University Logo"
                style={{ width: '100px', height: 'auto' }}
              />
            </Link>
          </div>
        </nav>
      </div>
     );
}
 
export default NavbarSource;