import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
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
import ShowNotifications from "../components/ShowNotifications";
import AddPostForm from "../components/AddPostForm";
import ShowPosts from "../components/ShowPosts";
import AddDepartmentForm from "../components/AddDepartmentForm";
import ShowDepartments from "../components/ShowDepartments";

export const RouterComponent = () => {
  const [userRole, setUserRole] = useState(""); // State to hold the user's role
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    // Check authentication status on component mount
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token here (e.g., check expiration)
      setIsAuthenticated(true);
      // Set user role here by fetching from the server or local storage
      const role = localStorage.getItem("userRole");
      setUserRole(role);
    }
    setLoading(false);
  }, []);


  const logout = () => {
    // Clear authentication token and set isAuthenticated to false
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserRole("");

  };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
      <Router>
        <Routes>
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} logout={logout} userRole={userRole} />}>
            {/* Admin routes */}
            {userRole === "ADMIN" && isAuthenticated && (
              <>
                <Route path="/addDepartment" element={<AddDepartmentForm />} />
                <Route path="/showDepartments" element={<ShowDepartments />} />
              </>
            )}
            {/* Source routes */}
            {userRole === "SOURCE" && isAuthenticated && (
              <>
                <Route path="/sideBar" element={<SideBar />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                <Route path="/addPost" element={<AddPostForm />} />
                <Route path="/showPosts" element={<ShowPosts />} />
                <Route path="/notifications" element={<ShowNotifications />} />
                <Route path="/addEvent" element={<AddEvent />} />
                <Route path="/showEvents" element={<Events />} />
                <Route path="/faq" element={<FAQs />} />

              </>
            )}
              {/* Student routes */}
              {userRole === "STUDENT" && isAuthenticated && (
              <>

              </>
            )}
          </Route>
          {/* Public routes */}
          {!isAuthenticated && <Route path="/" element={<LogIn />} />}
          {isAuthenticated && (
          <Route path="/" element={
            <>
            {userRole === "ADMIN" && <ShowDepartments />}
            {userRole === "SOURCE" && <Events />}
            {userRole === "STUDENT" && <Collages />}
            {/* Cancel the navigation if the userRole is not recognized */}
            {(userRole !== "ADMIN" && userRole !== "SOURCE" && userRole !== "STUDENT") && <Navigate to="/" />}
          </>
          } />
        )}
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/updatePassword" element={<UpdatePassword />} />
          {isAuthenticated && <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  };
