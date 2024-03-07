import React from "react";
import "../styles/Departments.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ShowDepartments from "../components/ShowDepartments";
import AdminNavBar from "../layouts/AdminNavBar";

function Departments() {
  return (
    <>
      <AdminNavBar />
      <div className="container-fluid bg-gray">
        <div className="row">
          <ShowDepartments />
        </div>
      </div>
    </>
  );
}

export default Departments;
