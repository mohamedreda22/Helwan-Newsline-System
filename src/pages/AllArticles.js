import axios from "axios";
import React, { useState } from "react";
import delete_icon from "../assets/icons/delete.svg";
import "../styles/AllArticles.css";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
 import AddArticle4 from "./AddArticle3";
import SideBar from "../components/SideBar";
const handleDeleteNotification = (notification) => {
  Swal.fire({
    title: "هل أنت متأكد من حذف هذا الإشعار؟",
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
const renderDeleteIcon = () => {
  return (
    <div>
      <img
        src={delete_icon}
        alt="Delete notification"
        className="delete-icon"
        onClick={handleDeleteNotification} 
      />
    </div>
  );
};

const AllArticles = () => {
  return (
    <>
      <div className="mt-2">
        <SideBar/>
        <div className="all">
        <div className="notifNum"> :عدد  المقالات </div>
        <table className="table">
          <tbody>
            <tr>
              <td>{renderDeleteIcon()}</td>
              <td>التاريخ</td>

              <td dir="rtl">
                <div>
                  <strong> المقالات</strong>
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

export default  AllArticles;