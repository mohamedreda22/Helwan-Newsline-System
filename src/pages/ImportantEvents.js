// import React, { useState, useEffect } from "react";
// import Navbar from "../layouts/Navbar";
// import Footer from "../layouts/Footer";
// import "../styles/ImportantEvents.css";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import mainGate from "../assets/images/main gate.jpeg";
// import university2 from "../assets/images/university2.jpeg";
// import universityImage from "../assets/images/universityImage.jpeg";

// function ImportantEvents() {
//   const [events, setEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const formatDateTime = (dateTimeString) => {
//     const dateTime = new Date(dateTimeString);
//     const day = dateTime.getDate();
//     const month = dateTime.toLocaleString("default", { month: "long" });
//     return { day, month };
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("http://localhost:9090/university/events");
//       setEvents(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setError("An error occurred while fetching events.");
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="mb-4">
//         <Navbar />
//       </div>
//        {/* Start Slider   */}
//         <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
//           <div className="carousel-inner">
//             <div className="carousel-item active">
//               <img src={universityImage} className="d-block w-100" alt="جامعة حلوان" />
//             </div>
//             <div className="carousel-item">
//               <img src={mainGate} className="d-block w-100" alt="البوابة الرئيسية" />
//             </div>
//             <div className="carousel-item">
//               <img src={university2} className="d-block w-100" alt="جامعة حلوان" />
//             </div>
//           </div>
//           <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Previous</span>
//           </button>
//           <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="visually-hidden">Next</span>
//           </button>
//         </div>
//           {/* End Slider */}
//       <div className="">
//         <div className="row event-cards1">
//           {events.map((eventItem) => (
//             <div className="blog-card alt col-10" key={eventItem.event_id}>
//               <div className="meta">
//                 <div
//                   className="photo"
//                   style={{
//                     backgroundImage: `url(${eventItem.event_image_path})`,
//                   }}
//                 ></div>
//                 <ul dir="rtl" className="details">
//                   <li className="author">{eventItem.event_place}</li>
//                   <li className="date">
//                   <span className="day1">{formatDateTime(eventItem.event_date).day}</span> {/* Display day */}
//                         <span className="event-card-month1">{formatDateTime(eventItem.event_date).month}</span>
//                     </li>
//                   <li className="tags">
//                     <ul>
//                       <li>
//                         <Link to="#">Learn</Link>
//                       </li>
//                       <li>
//                         <Link to="#">Code</Link>
//                       </li>
//                       <li>
//                         <Link to="#">JavaScript</Link>
//                       </li>
//                     </ul>
//                   </li>
//                 </ul>
//               </div>
//               <div className="impEvents-description">
//                 <h1>{eventItem.event_address}</h1>
//                 <h2>{eventItem.event_description}</h2>
//                 <p>{eventItem.event_link_path}</p>
//                 <p className="read-more">
//                   <Link to="#">Read More</Link>
//                 </p>
//               </div>
//             </div>
//           ))}
//           <div className="col-2">
//             <p>lore</p>
//           </div>
//         </div>
//         </div>
//       <Footer />
//     </div>
//   );
// }

// export default ImportantEvents;

import React, { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import "../styles/ImportantEvents.css";
import { Link } from "react-router-dom";
import axios from "axios";
import hu from "../assets/images/HU.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ImportantEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString("default", { month: "long" });
    return { day, month };
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/events"
      );
      setEvents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("An error occurred while fetching events.");
      setIsLoading(false);
    }
  };

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    const formattedDate = formatDateTime(date);
    const filteredEvents = events.filter((event) => {
      const eventDate = formatDateTime(event.event_date);
      return (
        eventDate.day === formattedDate.day &&
        eventDate.month === formattedDate.month
      );
    });
    setEvents(filteredEvents);
  };

  const tileClassName = ({ date }) => {
    const formattedDate = formatDateTime(date);
    const hasEvents = events.some((event) => {
      const eventDate = formatDateTime(event.event_date);
      return (
        eventDate.day === formattedDate.day &&
        eventDate.month === formattedDate.month
      );
    });
    return hasEvents ? "highlight" : null;
  };

  return (
    <div>
      <div className="mb-6">
        <Navbar />
      </div>
      <div className="event-mainImg">
        <div className="event-MainImg-overlay">
        <div className="bb"> <h1 dir="rtl" class="mainImg-title">اهم الاحداث التي تقام بجامعه حلون لحظه بلحظه</h1>
          </div>
        </div>
      </div>
      <div className=" ">
        <div className="col-4">
        <Calendar
          onChange={handleDateClick}
          value={selectedDate}
          tileClassName={tileClassName}
          className="calendar2"
          />
        </div>
        {/* <div className=" row event-cards1"> */}
        <div className=" row">

          {events.length > 0 ? (
            events.map((eventItem) => (
              <div className="blog-card alt col-8 " key={eventItem.event_id}>
                <div className="meta">
                  <div
                    className="photo"
                    style={{
                      backgroundImage: `url(${eventItem.event_image_path})`,
                    }}
                  ></div>
                  <ul dir="rtl" className="details">
                    <li className="author">{eventItem.event_place}</li>
                    <li className="date">
                      <span className="day1">
                        {formatDateTime(eventItem.event_date).day}
                      </span>
                      <span className="event-card-month1">
                        {formatDateTime(eventItem.event_date).month}
                      </span>
                    </li>
                    
                  </ul>
                </div>
                <div className="impEvents-description">
                  <h1>{eventItem.event_address}</h1>
                  <h3 className="imp-event-Des">{eventItem.event_description}</h3>
                  <p>{eventItem.event_link_path}</p>
                  <p className="read-more">
                    <Link to="#">Read More</Link>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-10">
              <h1>There are no events on this day.</h1>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ImportantEvents;
