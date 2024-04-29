// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const ShowNotifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const sourceId = Cookies.get('source_id'); // Assuming source ID is stored in cookies
//   useEffect(() => {
//     console.log("Source ID:", sourceId); // Log the source ID
//     if (sourceId) {
//       fetchNotifications();
//     }
//   }, [sourceId]);
  
//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get(`http://localhost:9090/university/notifications/source/${sourceId}`);
//       console.log("Response:", response.data); // Log the response data
//       setNotifications(response.data);
//     } catch (error) {
//       console.error('Error fetching notifications:', error);
//     }
//   };
  

//   const handleNotificationClick = (postId) => {
//     // Handle navigation to the corresponding post/event/article page
//     console.log(`Navigating to post/event/article with id ${postId}`);
//   };

//   return (
//     <div>
//       <h2>Notifications</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Notification Message</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {notifications.map(notification => (
//             <tr key={notification.notification_id} onClick={() => handleNotificationClick(notification.post_id)}>
//               <td>{notification.notification_message}</td>
//               <td>{notification.notification_date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ShowNotifications;
/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ShowNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const sourceId = Cookies.get('source_id'); // Assuming source ID is stored in cookies

  useEffect(() => {
    console.log("Source ID:", sourceId); // Log the source ID
    if (sourceId) {
      fetchNotifications(); // Fetch notifications immediately on component mount
      const intervalId = setInterval(fetchNotifications, 60000); // Fetch notifications every 1 minute (60000 milliseconds)

      return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }
  }, [sourceId]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/university/notifications/source/${sourceId}`);
      console.log("Response:", response.data); // Log the response data
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClick = (postId) => {
    // Handle navigation to the corresponding post/event/article page
    console.log(`Navigating to post/event/article with id ${postId}`);
  };

  return (
    <div>
      <h2>Notifications</h2>
      <table>
        <thead>
          <tr>
            <th>Notification Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(notification => (
            <tr key={notification.notification_id} onClick={() => handleNotificationClick(notification.post_id)}>
              <td>{notification.notification_message}</td>
              <td>{notification.notification_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowNotifications; */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../styles/notificationsWindow.css"

const NotificationWindow = ({ notifications, onClick }) => (
  <div className="notification-window">
    <h2>Notifications</h2>
    <ul>
      {notifications.map(notification => (
        <li key={notification.notification_id} onClick={() => onClick(notification.post_id)}>
          <div className="notification-message">{notification.notification_message}</div>
          <div className="notification-date">{notification.notification_date}</div>
        </li>
      ))}
    </ul>
  </div>
);

const ShowNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const sourceId = Cookies.get('source_id'); 

  useEffect(() => {
    console.log("Source ID:", sourceId);
    if (sourceId) {
      fetchNotifications(); 
      const intervalId = setInterval(fetchNotifications, 60000); 

      return () => clearInterval(intervalId); 
    }
  }, [sourceId]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/university/notifications/source/${sourceId}`);
      console.log("Response:", response.data); 
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClick = (postId) => {
    // Handle navigation to the corresponding post/event/article page
    console.log(`Navigating to post/event/article with id ${postId}`);
  };

  return (
    <NotificationWindow notifications={notifications} onClick={handleNotificationClick} />
  );
};

export default ShowNotifications;

