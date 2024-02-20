import {createBrowserRouter } from "react-router-dom";
import React from "react";
import Collages from "../pages/Collages";
import SideBar from "../components/SideBar";

export const router =createBrowserRouter ([
  {
    path: "/",
    element: <SideBar />,
    children:[
      {
        path: "/ryadyaBanat",
        element: <SideBar />,
      },
    ]
  }

  

]

)