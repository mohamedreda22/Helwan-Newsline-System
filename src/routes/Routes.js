import { createBrowserRouter } from "react-router-dom";
import React from "react";
 // import SideBar from './components/SideBar';
import AddArticle from '../pages/AddArticle';
// import Navbar from './layouts/Navbar';
// import Footer from './layouts/Footer';

//import Message from '../pages/Message';
export const router = createBrowserRouter([
  {
     
    // path: "/",
    // element: <Message/>,


    path: "/",
    element: <AddArticle/>,

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
