import axios from "axios";
import React, { useState } from "react";
import delete_icon from "../assets/icons/delete.svg";
import edit_icon from "../assets/icons/edit.svg";
import "../styles/AllVideos.css";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
//import AddArticle4 from "./AddArticle3";
import SideBar from "../components/SideBar";
import { useEffect } from "react";



const handleDeleteVideo = ( Video) => {
  Swal.fire({
    title: "هل أنت متأكد من حذف هذا  المقال",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "إلغاء",
    confirmButtonText: "حذف",
  }).then((result) => {
    if (result.isConfirmed) {
      // try {
      //     await axios.delete(
      //       `http://localhost:9090/university/notifications/${notification_id}`
      //     );
      //     // After deletion, fetch notifications again to update the list
      //     // fetchNotification_id();
      //   } catch (error) {
      //     // console.error('Error deleting notification:', error);
      //     // setError('An error occurred while deleting the notification.');
      //   }
      Swal.fire({
        title: "تم الحذف",
        icon: "success",
      });
    }
  });

  
};


const handleEditVideo =(event)=>{
  // event.preventDefault();
  // يتم توجيه المستخدم إلى صفحة تحرير المقال
  window.location.href = '/editvideo2';
 }
const renderDeleteIcon = () => {
  return (
    <div>
      <img
        src={delete_icon}
        alt="Delete  Video"
        className="delete-icon"
        onClick={handleDeleteVideo} 
      />
    </div>
  );
};


const renderEditIcon = () => {
  return (
    <div>
      <img
        src={edit_icon}
        alt="Edit  Video"
        className="edit-icon"
        onClick={ handleEditVideo} 
      />
    </div>
  );
};


const AllVideos = () => {
  const [ videos, setVideos]=useState({

    loding:true,
    results:[],
    err:null,
    reload:0
  })
  useEffect(()=>{
    setVideos({...videos,loding:true})
    axios.get("http://localhost:9090/university/videos")
    .then(resp=>{
      console.log(resp)
      setVideos({ ...videos,results:resp.data,loding:false,err:null})

    })
    .catch(err=>{
      setVideos({...videos,loding:false,err:"في حاجه غلط"})
    })

  },[] )
  return (
    <>
      <div className="mt-2">
        <SideBar/>
        <div className="all">
        <div className="videoNum"> : عدد الفيديوهات </div>
        <table className="table">
          <tbody>
            <tr>
              <td>{renderDeleteIcon()}</td>
              <td>{renderEditIcon()}</td>
              <td>التاريخ</td>

              <td dir="rtl">
                <div>
                  <strong>  الفيديوهات</strong>
                </div>
                <div>التفاصيل التفاصيل التفاصيل التفاصيل </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </>
  );
};

export default  AllVideos;