import { createBrowserRouter } from "react-router-dom";
import React from "react";
//import EditArticle from "../pages/EditArticle";
 // import SideBar from './components/SideBar';
import AddArticle from '../pages/AddArticle';
// import Navbar from './layouts/Navbar';
// import Footer from './layouts/Footer';
import SideBar from "../components/SideBar";
import AddArticle2 from "../pages/AddArticle2";
//import Message from '../pages/Message';
export const router = createBrowserRouter([
  {
     
    // path: "/",
    // element: <Message/>,


    path: "/",
    element: <AddArticle2/>,

    // path: "/",
    // element: <EditArticle/>,


    // path: "/",
    // element: <SideBar/>,


    // path: "/",
    // element: <Collages />,
    // children: [
    //   {
    //     path: "/ryadyaBanat",
    //     element: <Collages />,
    //   },
    // ],
  },
]);
