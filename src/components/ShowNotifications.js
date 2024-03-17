// import axios from "axios";
// import React, { useState } from "react";
// import delete_icon from "../assets/icons/delete.svg";
// import "../styles/ShowNotifications.css";
// import { FaPlus } from "react-icons/fa";
// import AddNotificationForm from "../components/AddNotificationForm";
// import Simplert from "react-simplert";

// const ShowNotifications = () => {
//   const [showSuccessAlert, setSuccessAlert] = useState(false);
//   const [showErrorAlert, setErrorAlert] = useState(false);

//   const handleDeleteNotification = (notification) => {
//     setErrorAlert(true); // Show error alert initially for demo purposes

//     // Perform deletion logic here
//     // axios.delete(...)
//     // .then(() => {
//     //    setSuccessAlert(true);
//     // })
//     // .catch(() => {
//     //    setErrorAlert(true);
//     // });
//   };

//   const renderDeleteIcon = () => {
//     return (
//       <div>
//         <img
//           src={delete_icon}
//           alt="Delete notification"
//           className="delete-icon"
//           onClick={handleDeleteNotification}
//         />
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="mt-2">
//         <div className="notifNum"> :عدد الاشعارات </div>
//         <table className="table">
//           <tbody>
//             <tr>
//               <td>{renderDeleteIcon()}</td>
//               <td>التاريخ</td>

//               <td dir="rtl">
//                 <div>
//                   <strong>الاشعارات</strong>
//                 </div>
//                 <div>التفاصيل التفاصيل التفاصيل التفاصيل </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       <Simplert
//         showSimplert={showErrorAlert}
//         type="error"
//         title="Failed"
//         message="حدث خطأ ما يرجي اعادة المحاولة"
//         onClose={() => setErrorAlert(false)}
//         customCloseBtnText="اغلاق"
//       />
//       <Simplert
//         showSimplert={showSuccessAlert}
//         type="success"
//         title="Success"
//         message="تم الحذف بنجاح"
//         onClose={() => setSuccessAlert(false)}
//         customCloseBtnText="تم"
//       />
//     </>
//   );
// };

// export default ShowNotifications;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/ShowNotifications.css";
// import Simplert from "react-simplert";

// const ShowNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showErrorAlert, setErrorAlert] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         setLoading(true);
        
//         const endpoints = [
//           "video",
//           "source",
//           "event",
//           "post",
//           "article"
//         ];

//         const promises = endpoints.map(async endpoint => {
//           const response = await axios.get(`http://localhost:9090/university/notifications/${endpoint}`);
//           return response.data;
//         });

//         const responses = await Promise.all(promises);

//         const allNotifications = responses.reduce((acc, data) => {
//           return [...acc, ...data];
//         }, []);

//         setNotifications(allNotifications);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//         setErrorMessage("حدث خطأ ما يرجي اعادة المحاولة");
//         setErrorAlert(true);
//         setLoading(false);
//       }
//     };

//     fetchNotifications();

//     const intervalId = setInterval(fetchNotifications, 10000);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="mt-2">
//           <div className="notifNum">عدد الاشعارات: {notifications.length}</div>
//           <table className="table">
//             <tbody>
//               {notifications.map(notification => (
//                 <tr key={notification.id}>
//                   <td dir="rtl">
//                     <div>
//                       <strong>{notification.title}</strong>
//                     </div>
//                     <div>{notification.details}</div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <Simplert
//         showSimplert={showErrorAlert}
//         type="error"
//         title="Failed"
//         message={errorMessage}
//         onClose={() => setErrorAlert(false)}
//         customCloseBtnText="اغلاق"
//       />
//     </>
//   );
// };

// export default ShowNotifications;
