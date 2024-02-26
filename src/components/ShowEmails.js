import axios from "axios";
import React, { useState } from "react";
import delete_icon from "../assets/icons/delete.svg";
import Swal from "sweetalert2";

const handleDeleteEmail = (email) => {
    Swal.fire({
      title: "هل أنت متأكد من حذف هذا الإيميل",
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
        //     // After deletion, fetch emails again to update the list
        //     // fetchEmails_id();
        //   } catch (error) {
        //     // console.error('Error deleting email:', error);
        //     // setError('An error occurred while deleting the email.');
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
          alt="Delete email"
          className="delete-icon"
          onClick={handleDeleteEmail} 
        />
      </div>
    );
  };
  
const ShowEmails = () => {
    return (
      <>
        <div className="mt-2">
          <div className="notifNum"> :عدد الإيميلات </div>
          <table className="table">
            <tbody>
              <tr>
                <td>{renderDeleteIcon()}</td>
                <td>التاريخ</td>
  
                <td dir="rtl">
                  <div>
                    <strong>الإيميلات</strong>
                  </div>
                  <div>التفاصيل التفاصيل التفاصيل التفاصيل </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };
  
  export default ShowEmails;
  