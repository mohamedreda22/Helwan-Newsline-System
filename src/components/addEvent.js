import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Simplert from 'react-simplert';
import Sidebar from "./SideBar";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import TextField from '@mui/material/TextField';
import '../styles/AddEvent.css';



export default function AddEvent() {
    const [formData, setFormData] = useState({
        event_address: "",
        category_id: "",
        description: "",
        source: "",
        event_place: "",
        event_date: DateTime.fromISO(null, { zone: 'Africa/Cairo' }),
        event_broadcast: "",
        event_link_path: "",
        event_image_path: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [eventDate, setEventDate] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [eventImagePath, setEventImagePath] = useState(null);


    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:9090/university/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e) => {
                e.preventDefault()



           if (!formData.event_address || !formData.category_id  || !formData.event_place) {
                  setError('برجاء ملئ كل البيانات');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:9090/university/events',formData

            );

            if (response && response.status === 200) {
                setShowSuccessAlert(true);
                resetForm();
                console.log(formData)

            } else {
                setShowErrorAlert(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('حدث خطأ أثناء إضافة الحدث');
            setShowErrorAlert(true);
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            event_address: "",
            category_id: "",
            description: "",
            source: "",
            event_place: "",
            event_date: null,
            event_broadcast: "",
            event_link_path: "",
            event_image_path: "",
        });
        setError('');
        setEventDate(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleStartDateChange = (date) => {
        setFormData({
            ...formData,
            event_date: date,
        });
        console.log(date)
    };

/*     const handleFileChange = (e, data) => {
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
                });
            }; */



    return (
        <div className="add-event-page">
            <Sidebar />
            <h3>اهم الاحداث</h3>
            <div className="add-event-container">
                <h1 className="header">إضافة حدث</h1>
                <form onSubmit={handleSubmit}>
                    {/* Your form inputs */}
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
                                required
                        >
                                <option value="">اختر التصنيف</option>
                                {categories.map(category => (
                                    <option key={category.category_id} 
                                    value={category.category_id}>
                                        {category.category_name}
                                        </option>
                                ))}
                            </select>

                    </div> 
                    </div>
                    <div className="form-group">
                        <label className="lable" htmlFor="description">الوصف</label>
                        <textarea
                            type="text"
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
                        </div>
                     </div>
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
                    {/* Your remaining form inputs */}
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
                        <label className="lable" htmlFor="event_link_path">لينك اللقاء</label>
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
{/*                     <label className="lable" htmlFor="event_image_path">رفع الصورة</label>
                    <br/>
                    <input 
                     className="form-control"
                     type="file" 
                     id='event_image_path' 
                     name="event_image_path"
                     onChange={handleCombinedFileChange}
                     required /> */}
                
                        <label className="lable" htmlFor="event_image_path">رفع الصورة</label>
                              <br></br>  <span style={{color: 'red'}}>
                                    disabled cause of backend API handle
                                </span>

                    </div>
                    <button type="submit" disabled={isLoading} className="btn-submit">
                        {isLoading ? 'جاري إضافة الحدث' : 'إضافة الحدث'}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <Simplert
                        showSimplert={showErrorAlert}
                        type="error"
                        title="Failed"
                        message="حدث خطأ ما يرجي اعادة المحاولة"
                        onClose={() => setShowErrorAlert(false)}
                        customCloseBtnText='اغلاق'
                    />
                    <Simplert
                        showSimplert={showSuccessAlert}
                        type="success"
                        title="Success"
                        message="تمت الاضافة بنجاح"
                        onClose={() => setShowSuccessAlert(false)}
                        customCloseBtnText='تم '
                    />
                </form>
            </div>
        </div>
    );
}
