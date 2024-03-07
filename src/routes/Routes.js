import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Collages from "../pages/Collages";
import Notifications from "../pages/Notifications";
import Emails from "../pages/Emails"; // Import your Emails component
import AddPost from "../pages/AddPost";
import Posts from "../pages/Posts";
import EditPost from "../components/EditPost";
import AddDepartmentForm from "../components/AddDepartmentForm";
import Departments from "../pages/Departments";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Notifications />,
  },
  {
    path: "/emails",
    element: <Emails />,
  },
  {
    path: "/addpost",
    element: <AddPost />,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/editpost",
    element: <EditPost />,
  },
  {
    path: "/adddepartment",
    element: <AddDepartmentForm />,
  },
  {
    path: "/departments",
    element: <Departments />,
  },
]);
