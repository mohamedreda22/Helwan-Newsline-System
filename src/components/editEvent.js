import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import '../styles/EditEvent.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import CalendarIcon from '../assets/icons/calendar.svg';
import TimePicker from 'react-time-picker';
import Simplert from 'react-simplert';
import TimeIcon from '../assets/icons/time.svg';
import 'react-time-picker/dist/TimePicker.css';

export default function EditEvent({ event, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        event_address: event?.event_address || "",
        category_id: event?.category_id || "",
        event_place: event?.event_place || "",
        event_date: event?.event_date || "",
        event_time: event?.event_time || "",
        event_broadcast: event?.event_broadcast || "",
        event_link_path: event?.event_link_path || "",

 /*                    event_address: "",
                    category_id: "",
                    event_place: "",
                    event_broadcast: "",
                    event_link_path: "", */
     });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [eventDate, setEventDate] = useState(new Date(event.event_date));
    const [eventTime, setEventTime] = useState(event.event_time);
    const [categories, setCategories] = useState([]);
    const datePickerRef = useRef(null);
    const timePickerRef = useRef(null);

    useEffect(() => {
        setFormData({
            ...formData,
            event_address: event?.event_address || "",
            category_id: event?.category_id || "",
            event_place: event?.event_place || "",
            event_broadcast: event?.event_broadcast || "",
            event_link_path: event?.event_link_path || "",
        });
    }, [event]);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            event_date: eventDate,
            event_time: eventTime,
        }));
    }, [eventDate, eventTime]);

    useEffect(() => {
        fetchCategories();
    }, []);
    

    const handleDateChange = (date) => {
        setEventDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                event_address: formData.event_address,
                category_id: formData.category_id,
                event_place: formData.event_place,
                event_date: eventDate, 
                event_time: eventTime, 
                event_broadcast: formData.event_broadcast,
                event_link_path: formData.event_link_path,
                
            };
            await axios.put(`http://localhost:9091/university/events/${event.event_id}`, updatedFormData);
            setShowSuccessAlert(true);
            onSave();
        } catch (error) {
            console.error('Error updating event:', error);
            setShowErrorAlert(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateIconClick = () => {
        // When the icon is clicked, focus on the DatePicker to open the calendar
        if (datePickerRef.current) {
          datePickerRef.current.setOpen(true);
        }
      };

      const handleTimeIconClick =()=>{
        if (timePickerRef.current) {
            timePickerRef.current.setOpen(true);
          
      }}
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9091/university/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            
        }
    };

    return (
        <div className="add-event-container">
            <h1 className="header">تعديل الحدث</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label className="lable" htmlFor="event_address">العنوان</label>
                    <input
                        type="text"
                        id="event_address"
                        name="event_address"
                        value={formData.event_address}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                            <div className="form-group">
                        <label className="lable" htmlFor="category_id">التصنيف</label>
                        <select
                            id="category_id"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            className="form-control"
                        >
                         <option value="">اختر التصنيف</option>
                                {categories.map(category => (
                                    <option key={category.category_id} 
                                    value={category.category_id}>
                                        {category.category_name}
                                        </option>
                                ))}
                        </select>
            </div></div>
                <div className="form-group">
                    <label className="lable" htmlFor="description">الوصف</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-row">
                <div className="form-group">
                    <label className="lable" htmlFor="source">المصدر</label>
                    <input
                        type="text"
                        id="source"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label className="lable" htmlFor="event_place">المكان</label>
                    <input
                        type="text"
                        id="event_place"
                        name="event_place"
                        value={formData.event_place}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div></div>
                <div className="form-row">
                <div className="form-group">
                    <label className="lable" htmlFor="event_date">التاريخ</label>
                    <div className="date-time-container">
                        <DatePicker
                           ref={datePickerRef}
                           selected={eventDate}
                           onChange={handleDateChange}
                           dateFormat="dd/MM/yyyy"
                           className="form-control"
                           name="event_date"
                           id="event_date"
                           calendarClassName="calendar-container"
                        />
                        <img src={CalendarIcon} alt="calendar" className="calendar-icon" onClick={handleDateIconClick} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="lable" htmlFor="event_time">الساعة</label>
                    <div className="date-time-container">
                    <input
                            type="text"
                            id="event_time"
                            name="event_time"
                            value={formData.event_time}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="HH:mm AM/PM"
                        />
                        <img src={TimeIcon} alt="time" className="time-icon" onClick={handleTimeIconClick} />
                    </div>
                </div>
                </div>
                <div className="form-row">
                <div className="form-group">
                    <label className="lable" htmlFor="event_broadcast">سيتم بثه؟</label>
                    <select
                            type="dropdown"
                            id="event_broadcast"
                            name="event_broadcast"
                            value={formData.event_broadcast}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">اختر</option>
                            <option value="YES">نعم</option>
                            <option value="NO">لا</option>
                        </select>
                </div>
                <div className="form-group">
                    <label className="lable" htmlFor="event_link_path">رابط الحدث</label>
                    <input
                        type="text"
                        id="event_link_path"
                        name="event_link_path"
                        value={formData.event_link_path}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                </div>
                <div className="form-group">
                    <label className="lable" htmlFor="event_image_path">صورة الحدث</label>
                    <br></br>  <span style={{color: 'red'}}>
                                    disabled cause of backend API handle
                                </span>
{/*                     <input
                        type="text"
                        id="event_image_path"
                        name="event_image_path"
                        value={formData.event_image_path}
                        onChange={handleChange}
                        className="form-control"
                    /> */}
                </div>
                

                <button type="submit" className="btn-submit" style={{width:"30%"}}>
                    حفظ التغييرات
                </button>
                <button type="button" className="btn-submit" onClick={onCancel} style={{width:"30%"}}>
                    إلغاء
                </button>

            </form>

            <Simplert
                showSimplert={showErrorAlert}
                type="error"
                title="Failed"
                message="An error occurred. Please try again later."
                onClose={() => setShowErrorAlert(false)}
                customClass="custom-error-alert" 
            />
            <Simplert
                showSimplert={showSuccessAlert}
                type="success"
                title="Success"
                message="Event updated successfully."
                onClose={() => setShowSuccessAlert(false)}
                customClass="custom-success-alert" 
            />
        </div>
    );
}
