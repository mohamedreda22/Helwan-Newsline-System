import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/EditEvent.css";
import Simplert from 'react-simplert'

export default function EditSport({ sport, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        sport_content: sport?.sport_content || "",
        sport_image: sport?.sport_image || "",
        sport_source_id: sport?.sport_source_id || "",
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [sources, setSources] = useState([]);
    const [sportImagePath, setSportImagePath] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    
    const imageRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(()=>{
        setFormData({
            ...formData,
            sport_image: sport?.sport_image || "",
            sport_content: sport?.sport_content || "",
            sport_source_id: sport?.sport_source_id || "",
        })
    },[sport])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:9090/university/sports/${sport.sport_id}`, formData);
            if (response&&(response.status === 200 ||response.status === 201 || response.status === 202) ) {
                setShowSuccessAlert(true);
                onSave(formData);
            } else {
                setShowErrorAlert(true);
            }
        } catch (error) {
            console.error('Error updating sport:', error);
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

    useEffect(() => {
        fetchSources();
    }, []);

    const fetchSources = async () => {
        try {
            const response = await axios.get('http://localhost:9090/university/sources');
            setSources(response.data);
        } catch (error) {
            console.error('Error fetching sources:', error);
        }
    };

    const handleFileChange = (e, data) => {
        const file = e ? e.target.files[0] : null;
        const reader = new FileReader();
        
        if (file) {
            reader.onloadend = () => {
                setSportImagePath(reader.result);
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
                sport_image: imageData,
            });
            setPreviewImage(imageData); 
        });
    };

    return (
        <div className="edit-event-container" dir="rtl">
            <h2 className="header" style={{paddingRight:"25%"}}>تعديل الرياضة</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label className="lable" htmlFor="sport_content">محتوى الرياضة</label>
                    <textarea
                        id="sport_content"
                        name="sport_content"
                        value={formData.sport_content}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="lable" htmlFor="sport_source_id">مصدر الرياضة</label>
                    <select
                        id="sport_source_id"
                        name="sport_source_id"
                        value={formData.sport_source_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">اختر مصدر الرياضة</option>
                        {sources.map(source => (
                            <option key={source.source_id} value={source.source_id}>
                                {source.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="lable" htmlFor="sport_image">تعديل الصورة</label>
                    <br/>
                    <input 
                        className="form-control"
                        type="file" 
                        id="sport_image" 
                        name="sport_image"
                        onChange={handleCombinedFileChange}
                    /> 
                </div>
                {/* Submit and cancel buttons */}
                <div className="btn-container1">
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
                title="فشل"
                message="حدث خطأ ما يرجي اعادة المحاولة"
                onClose={() => setShowErrorAlert(false)}
                customCloseBtnText= 'اغلاق'
            />
            <Simplert
                showSimplert={showSuccessAlert}
                type="success"
                title="نجاح"
                message="تم التعديل بنجاح"
                onClose={() => setShowSuccessAlert(false)}
                customCloseBtnText= 'تم '
            />
        </div>
    );
}
