import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  UserRoleContext  from '../hooks/UserRoleContext';
import LogIn from '../pages/LogIn';
import Collages from '../pages/Collages';
import Events from '../components/events';
import AddEvent from '../components/addEvent';
import FAQs from "../components/faq";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import UpdatePassword from "../pages/UpdatePassword";
import StudentDashboard from "../pages/StudentsDashboard";
import ShowDepartments from "../components/ShowDepartments"
import Posts from "../pages/Posts";
import AddPost from "../pages/AddPost";
import SideBar from "../components/SideBar";


const RouterComponent = () => {
  const { userRole } = useContext(UserRoleContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        <Route path="/collages" element={<Collages />} />

        {isAuthenticated ? (
          <>
{/*             {userRole === 'STUDENT' && (
              <Route path="/collages" element={<Collages />} />
            )} */}
            {userRole === 'ADMIN' && (
              <Route path="/showDepartments" element={<ShowDepartments />} />
            )}
            {userRole === 'SOURCE' && (
              <>
            <Route path="/addEvent" element={<AddEvent />} />
            <Route path="/showEvents" element={<Events />} />
            <Route path="/faq" element={<FAQs />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/showPosts" element={<Posts />} />
            <Route path="/addPost" element={<AddPost />} />
            <Route path="/sideBar" element={<SideBar />} />
              </>
            )}
            <Route path="/logout" element={<Navigate to="/login" />} />
          </>
        ) : (
          <Navigate to="/collages" />
        )}
      </Routes>
    </Router>
  );
};

export default RouterComponent;
