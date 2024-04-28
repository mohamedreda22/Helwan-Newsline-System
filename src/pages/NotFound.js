import React from 'react';
import '../styles/NotFound.css'; 
import { useNavigate } from 'react-router-dom'; 
import logo from '../assets/images/logo.png'; 

const NotFound = () => {
  const navigate = useNavigate(); 

  return (
    <div className="not-found-container">
      <div className="not-found-content">
          <div className="logo">
                  <img src={logo} alt="logo" />
                </div>
        <h1 className="not-found-title">404 - Not Found</h1>
        <p className="not-found-message">The page you are looking for does not exist or you don't have permission to access it.</p>
        <p className="not-found-message">Please check the URL or contact the administrator for assistance.</p>
        <div className="btn-container">
        <button className='btn-submit' onClick={() => navigate('/login')}>Back to LogIn page</button>
        <button className='btn-submit' onClick={() => navigate('/colleges')} style={{backgroundColor: "blue"}}>Go to Colleges page</button>

      </div>
      
      </div>
    </div>
  );
}

export default NotFound;
