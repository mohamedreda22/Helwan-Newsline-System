import React from 'react';
import universityLogo from "../assets/images/logo.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const NavbarSource = () => {

    const handleExit=()=>{
        
    }
    return ( 
        <div className="containerxxl">
        <nav class="navbar navbar-expand-lg bg-color-gray">
          <div class="container-fluid">
            
            <button  
            style={{ color:"white", 
                    backgroundColor:"blue",
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
                  <Link to="/" className="nav-link">
                    الاقسام  
                  </Link>
                </li>
                <li class="nav-item ms-5">
                  <Link to="/ " className="nav-link">
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
                // width="64"
                // height="60"
                style={{ width: '100px', height: 'auto' }}
              />
            </Link>
          </div>
        </nav>
      </div>
     );
}
 
export default NavbarSource;