import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Collages from "../pages/Collages";
import Notifications from "../pages/Notifications";
import Emails from "../pages/Emails"; // Import your Emails component
import AddPost from "../pages/AddPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Notifications />,
  },
  {
    path: "/emails", // Add a new path for emails
    element: <Emails />, // Specify the component for the emails page
  },
  {
    path: "/addpost", // Add a new path for emails
    element: <AddPost />, // Specify the component for the emails page
  },
]);
