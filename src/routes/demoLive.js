import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PrivateRoutes from './PrivateRoutes';
import Collages from "../pages/Collages";
import SideBar from "../components/SideBar";
import AddEvent from "../components/addEvent";
import Events from "../components/events";
import LogIn from "../pages/LogIn";
import FAQs from "../components/faq";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import UpdatePassword from "../pages/UpdatePassword";
import Logout from "../pages/Logout";
import StudentDashboard from "../pages/StudentsDashboard";
import ShowDepartments from "../components/ShowDepartments"
import Posts from "../pages/Posts";
import AddPost from "../pages/AddPost";
//import ShowNotifications from "../pages/Notifications"


export const RouterComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    // Check authentication status on component mount
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token here (e.g., check expiration)
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    // Clear authentication token and set isAuthenticated to false
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

    if (loading) {
        return <p>Loading...</p>;
    }

  return (
    <Router>
      <Routes>
        {/* Private routes wrapped in PrivateRoutes component */}
        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} logout={logout} />}>
          <Route path="/collages" element={<Collages />} />
          <Route path="/sideBar" element={<SideBar />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/showEvents" element={<Events />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/addFaq" element={<AddEvent />} />
          <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={<StudentDashboard />} />

          <Route path="/addPost" element={<AddPost />} />
          <Route path="/showPosts" element={<Posts />} />
          <Route path="/showDepartments" element={<ShowDepartments/>}/>
{/*           <Route path="/showNotifications" element={<ShowNotifications/>}/>
 */}
          

            </Route>
            {/* Public route for login */}
                <Route path="/" element={!isAuthenticated ?  <LogIn /> : <Events />} />

                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/updatePassword" element={<UpdatePassword />} />
                <Route path="/colages" element={<Collages />} />
                




      </Routes>
    </Router>
  );
};
