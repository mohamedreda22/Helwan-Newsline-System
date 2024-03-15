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
import {PrivateRoutes} from './PrivateRoutes';
import NotFound from '../pages/NotFound'
import VideoList from '../components/videoList';


export const RouterComponent = () => {
  const { userRole } = useContext(UserRoleContext);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('token') !== null;
  });  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Attempting to get token from local storage');
    const token = sessionStorage.getItem('token');
    console.log('Token from local storage:', token);
    if (token) {
      setIsAuthenticated(true);
      console.log('User is authenticated');
    }
    setLoading(false);
  }, []);

/*   const logout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    console.log('User logged out');

  }; */

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />
        <Route path="/collages" element={<Collages />} />
        <Route path="/videoList" element={<VideoList />} />


        {isAuthenticated ? (
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
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
            </Route>
                    ) : (
                        <Route path="*" element={<NotFound />} />

/*           <Navigate to="/collages" />
 */
)}

      </Routes>
    </Router>
  );
};

