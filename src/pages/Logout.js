import { React,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  // Clear authentication token and update isAuthenticated state
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
    navigate('/login'); 
  };

  // Call the logout function when the component mounts
  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;