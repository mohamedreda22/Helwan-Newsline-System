import {createBrowserRouter } from "react-router-dom";
import React from "react";
import Collages from "../pages/Collages";

export const router =createBrowserRouter ([
  {
    path: "/",
    element: <Collages />,
    children:[
      {
        path: "/ryadyaBanat",
        element: <Collages />,
      },
    ]
  }

  

]

)