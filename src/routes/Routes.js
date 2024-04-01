import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserRoleProvider } from '../hooks/UserRoleContext'; 
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
import AddVideoForm from '../components/AddVideoForm';
import AddArticle from "../pages/AddArticle";
import EditArticle from "../pages/EditArticle";
import AllArticles from "../pages/AllArticles";
import AddSource from "../pages/AddSource";
import EditSource from "../pages/EditSource";
import AllSources from "../pages/AllSources";
import LandingPage from "../pages/LandingPage";
import Message from "../pages/Message";
import ArticlePage from '../pages/ArticlePage';
import SeeMoreArticles from '../pages/SeeMoreAtricles';
import ImportantEvents from '../pages/ImportantEvents';
import PostsStdView from '../pages/PostsStdView';
import AddNews from '../pages/AddNews';
import AddSport from '../pages/AddSport';
import Sports from '../pages/Sports';
import News from '../pages/News';


//import { useUserRole } from '../hooks/UserRoleContext';

export const RouterComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  //const { userRole } = useUserRole();


  useEffect(() => {
    console.log('Attempting to get token from session storage');
    const token = sessionStorage.getItem('token');
    console.log('Token from session storage:', token);
    if (token) {
      setIsAuthenticated(true);
      console.log('User is authenticated');
      const userRoleFromSession = sessionStorage.getItem('token');
      console.log('User role from session storage:', userRoleFromSession);
      setUserRole(userRoleFromSession);
    }
    setLoading(false);
  }, [setIsAuthenticated]);


/*   useEffect(() => {
    console.log("Attempting to get userRole from useContext hook");
    console.log("User Role from useContext hook:", userRole);
    if (userRole) {
      setIsAuthenticated(true);
      console.log('User is authenticated');
    } else {
      // If userRole is not available, it might still be loading or not authenticated
      setLoading(false);
    }
  }, [userRole, setIsAuthenticated]); */
  
  

  const logout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    console.log('User logged out');

  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/updatePassword" element={<UpdatePassword/>} />
        <Route path="/collages" element={<Collages/>} />
        <Route path="/message" element={<Message/>} />
        <Route path="/landingPage" element={<LandingPage/>} />
        {/* <Route path="/articlepage" element={<ArticlePage/>} /> */}
        {/* <Route path="/seemorearticles" element={<SeeMoreArticles/>} /> */}
        
        <Route path="/importantEvents" element={<ImportantEvents/>} />
        <Route path="/allPosts" element={<PostsStdView/>} />
        <Route exact path="/see" element={ <SeeMoreArticles/>} />
        <Route path="/article/:article_id" element={<ArticlePage/>} />

        
        

        {isAuthenticated ? (
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} logout={logout} />}>
{/*           {userRole === 'STUDENT' && (
              <Route path="/landingPage" element={<LandingPage/>} />
            )} */}
            {userRole === 'ADMIN' && (
              <>
              <Route path="/showDepartments" element={<ShowDepartments/>} />
              <Route path="/source"    element={< AddSource/>} />
              <Route path="/editsource"    element={<  EditSource/>} />
              <Route path="/allsources"  element={< AllSources/>} /> 
            </>
            )}
            {userRole === 'SOURCE' && (
              <>
            <Route path="/addEvent" element={<AddEvent/>} />
            <Route path="/showEvents" element={<Events/>} />
            <Route path="/faq" element={<FAQs/>} />
            <Route path="/dashboard" element={<StudentDashboard/>} />
            <Route path="/videoList" element={<VideoList/>} />
            <Route path="/addVideo" element={<AddVideoForm/>} />
            <Route path="/sideBar" element={<SideBar/>} />
            <Route path="/message"      element={<Message/>} />
            <Route path="/addarticle"  element={<AddArticle/>} />
            <Route path="/editarticle"  element={<EditArticle/>} />
            <Route path="/articles"    element={<AllArticles/>} />
            <Route path="/showPosts" element={<Posts/>} />
            <Route path="/addpost" element={<AddPost/>} />
            <Route path="/addNews" element={<AddNews/>} />
            <Route path="/addSport" element={<AddSport/>} />
            <Route path="/showSports" element={<Sports/>} />
            <Route path="/showNews" element={<News/>} />

            
              </>
            )}
            <Route path="/logout" element={<Navigate to="/login" />} />
            </Route>
                    ) : (
                        <Route path="*" element={<NotFound/>} />

/*           <Navigate to="/collages" />
 */
)}

      </Routes>
    </Router>
  );
};

