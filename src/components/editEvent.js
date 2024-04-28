import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/EditEvent.css";
import Simplert from 'react-simplert'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import TextField from '@mui/material/TextField';

export default function EditEvent({ event, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        event_address: event?.event_address || "",
        category_id: event?.category_id || "",
        event_place: event?.event_place || "",
        event_date: event ? DateTime.fromISO(event.event_date, { zone: 'Africa/Cairo' }) : null,
        event_time: event?.event_time || "",
        event_broadcast: event?.event_broadcast || "",
        event_link_path: event?.event_link_path || "",
        source_id: event?.source_id || "",
        event_description: event?.event_description || "",
        event_image_path: event?.event_image_path || "",
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [eventImagePath, setEventImagePath] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    
    const imageRef = useRef(null);




    const handleStartDateChange = (date) => {
        setFormData({
            ...formData,
            event_date: date,
        });
        console.log(date)
    };

    useEffect(() => {
        setFormData({
            ...formData,
            event_address: event?.event_address || "",
            category_id: event?.category_id || "",
            event_place: event?.event_place || "",
            event_broadcast: event?.event_broadcast || "",
            event_link_path: event?.event_link_path || "",
            source_id:event?.source_id || "",
            event_description: event?.event_description || "",
            event_image_path: event?.event_image_path || "",

        });
    }, [event]);

    useEffect(() => {
        fetchCategories();
    }, []);
    useEffect(()=>{
        fetchSources();
    },[]);

    const fetchSources = async () => {
        try {
            const response = await axios.get('http://localhost:9090/university/sources');
            setSources(response.data);
        } catch (error) {
            console.error('Error fetching sources:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:9090/university/events/${event.event_id}`, formData);
            if (response.status === 200) {
            setShowSuccessAlert(true);
            onSave(formData);}
            else{
                setShowErrorAlert(true);
            }
        } catch (error) {
            console.error('Error updating event:', error);
            setShowErrorAlert(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9090/university/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    const handleFileChange = (e, data) => {
        const file = e ? e.target.files[0] : null;
        const reader = new FileReader();
        
        if (file) {
            reader.onloadend = () => {
                setEventImagePath(reader.result);
                if (data) {
                    data(reader.result);
                }
            };
            reader.readAsDataURL(file);
        } else if (data) {
            data(null);
        }
    };

            const handleCombinedFileChange = (e) => {
                handleFileChange(e, (imageData) => {
                    setFormData({
                        ...formData,
                        event_image_path: imageData,
                    });
                    setPreviewImage(imageData); 
                });
            };

    return (
        <div className="add-event-page" style={{padding:"12px",marginRight:"160px"}}>
        <div className="edit-event-container" dir="rtl">
            <h2 className="header" style={{paddingRight:"0%"}}>تعديل الحدث</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-row" >
                <div className="form-group">
                    <label className="lable" htmlFor="event_address">العنوان</label>
                    <input
                        type="text"
                        id="event_address"
                        name="event_address"
                        value={formData.event_address}
                        onChange={handleInputChange}
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
                    <label className="lable" htmlFor="event_description">الوصف</label>
                    <textarea
                        id="event_description"
                        name="event_description"
                        value={formData.event_description}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-row">
                <div className="form-group">
                    <label className="lable" htmlFor="source_id">المصدر</label>
                    <select
                            id="source_id"
                            name="source_id"
                            value={formData.source_id}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">اختر المصدر</option>
                            {sources.map(source => (
                                <option key={source.source_id} value={source.source_id}>
                                    {source.full_name}
                                </option>
                            ))}
                        </select>
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
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <DateTimePicker
                            label="اختر الوقت والتاريخ "
                            value={formData.event_date}
                            onChange={handleStartDateChange}
                            textField={(params) => <TextField {...params} />}
                            disablePast
                            timeZone="Africa/Cairo"
                        />
                    </div>
                </LocalizationProvider>
                {/* Remaining form inputs */}
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
                     <label className="lable" htmlFor="event_image_path">تعديل الصورة</label>
                    <br/>
                    <input 
                     className="form-control"
                     type="file" 
                     id='event_image_path' 
                     name="event_image_path"
                     onChange={handleCombinedFileChange}
                      /> 
                    </div>
                <div className="btn-container1" >
                <button type="submit" className="btn-submit"  style={{width:"30%"}}>
                    حفظ التغييرات
                </button>
                <button type="button" className="btn-submit" onClick={onCancel} style={{width:"30%"}}>
                    إلغاء
                </button>
                </div>
            </form>    
            {/* Success and error alerts */}
            <Simplert
                showSimplert={showErrorAlert}
                type="error"
                title="Failed"
                message="حدث خطأ ما يرجي اعادة المحاولة"
                onClose={() => setShowErrorAlert(false)}
                customCloseBtnText= 'اغلاق'
            />
            <Simplert
                showSimplert={showSuccessAlert}
                type="success"
                title="Success"
                message="تم التعديل بنجاح"
                onClose={() => setShowSuccessAlert(false)}
                customCloseBtnText= 'تم '
            />
        </div>
        </div>
    );
}
