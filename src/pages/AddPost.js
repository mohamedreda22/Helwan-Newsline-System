import React from "react";
import SideBar from "../components/SideBar";
import AddPostForm from "../components/AddPostForm";

function AddPost() {
  return (
    <div className="container-fluid bg-gray">
      <div className="row">
        <div className="col-lg-10">
          <AddPostForm />
        </div>
        <div className="col-lg-2">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default AddPost;
