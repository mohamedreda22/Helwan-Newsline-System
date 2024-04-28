import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import Colleges from '../pages/Colleges';
import Events from '../components/events';
import AddEvent from '../components/addEvent';
import FAQs from "../components/faq";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import UpdatePassword from "../pages/UpdatePassword";
import ShowDepartments from "../components/ShowDepartments"
import Posts from "../pages/Posts";
import AddPost from "../pages/AddPost";
import SideBar from '../layouts/SideBar';
import {PrivateRoutes} from './PrivateRoutes';
import NotFound from '../pages/NotFound'
import VideoList from '../components/videoList';
import AddVideoForm from '../components/AddVideoForm';
import AddArticle from "../pages/AddArticle";
import Articles from "../components/Articles";
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
import StudentVideos from "../pages/VideosForStudents";
import VideoDetails from "../components/videoDetails";
import PostDetails from '../pages/PostDetails';
import AddCollege from "../pages/AddCollege"
import CollegeDetails from '../pages/CollegeDetails';
import ShowNotifications from '../components/ShowNotifications';
import Profile from '../pages/Profile';
import Cookies from 'js-cookie';
import Loading from '../components/loading';

export const RouterComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');


  useEffect(() => {
    const token = Cookies.get('userRole');
    if (token) {
      setIsAuthenticated(true);
      const userRoleFromSession = Cookies.get('userRole');
      setUserRole(userRoleFromSession);
    }
    setLoading(false);
  }, [setIsAuthenticated]);
  
  

  const logout = () => {
    Cookies.remove('userRole');
    setIsAuthenticated(false);
    console.log('User logged out');

  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/updatePassword" element={<UpdatePassword/>} />
        <Route path="/colleges" element={<Colleges/>} />
        <Route path="/colleges/:id" element={<CollegeDetails />} />
        <Route path="/message" element={<Message/>} />
        <Route path="/landingPage" element={<LandingPage/>} />
        <Route path="/videos" element={<StudentVideos/>} />
        <Route path="/videos/:id" element={<VideoDetails />} />
        <Route path="/posts/:post_id" element={<PostDetails />} />
        <Route path="/Loading" element={<Loading/>} />


        <Route path="/importantEvents" element={<ImportantEvents/>} />
        <Route path="/posts" element={<PostsStdView/>} />
        <Route exact path="/articles" element={ <SeeMoreArticles/>} />
        <Route path="/articles/:article_id" element={<ArticlePage/>} />
        <Route path="/profile" element={<Profile/>} />

        {isAuthenticated ? (
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} logout={logout} />}>
            {userRole === 'ADMIN' && (
              <>
              <Route path="/showDepartments" element={<ShowDepartments/>} />
              <Route path="/source"    element={< AddSource/>} />
              <Route path="/editsource"    element={<  EditSource/>} />
              <Route path="/allsources"  element={< AllSources/>} /> 
              <Route path="/addCollege" element={<AddCollege/>} />
            </>
            )}
            {userRole === 'SOURCE' && (
              <>
            <Route path="/addEvent" element={<AddEvent/>} />
            <Route path="/showEvents" element={<Events/>} />
            <Route path="/faq" element={<FAQs/>} />
            <Route path="/videoList" element={<VideoList/>} />
            <Route path="/addVideo" element={<AddVideoForm/>} />
            <Route path="/sideBar" element={<SideBar/>} />
            <Route path="/message"      element={<Message/>} />
            <Route path="/addarticle"  element={<AddArticle/>} />
            <Route path="/articles1"    element={<Articles/>} />
            <Route path="/showPosts" element={<Posts/>} />
            <Route path="/addpost" element={<AddPost/>} />
            <Route path="/addNews" element={<AddNews/>} />
            <Route path="/addSport" element={<AddSport/>} />
            <Route path="/showSports" element={<Sports/>} />
            <Route path="/showNews" element={<News/>} />     
            <Route path="/notifications" element={<ShowNotifications/>} />            
       
            
              </>
            )}
            <Route path="/logout" element={<Navigate to="/login" />} />
            </Route>
                    ) : (
                        <Route path="*" element={<Loading/>} />
)}

      </Routes>
    </Router>
  );
};

