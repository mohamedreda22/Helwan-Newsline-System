import React, { useState, useEffect } from "react";
import axios from "axios";
import Simplert from 'react-simplert'
import "../styles/EditEvent.css";

export default function EditPost({ post, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        post_content: post?.post_content || "",
        post_image_path: post?.post_image_path || "",
        category_id: post?.category_id || "",
        source_id: post?.source_id || "",
        source_string: post?.source_string || ""
    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [sources, setSources] = useState([]);

    useEffect(() => {
        setFormData({
            post_content: post?.post_content || "",
            post_image_path: post?.post_image_path || "",
            category_id: post?.category_id || "",
            source_id: post?.source_id || "",
            source_string: post?.source_string || ""
        });
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:9090/university/posts", formData);
            
            if (response && (response.status === 200 || response.status === 201 || response.status === 202)) {
                setShowSuccessAlert(true);
                onSave(response.data);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setShowErrorAlert(true);
            }
        } catch (error) {
            console.error('Error creating post:', error);
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        if (file) {
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    post_image_path: reader.result,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="edit-event-container" dir="rtl">
            <h2 className="header" style={{paddingRight:"25%"}}>إنشاء منشور جديد</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label className="lable" htmlFor="post_content">محتوى المنشور</label>
                    <textarea
                        id="post_content"
                        name="post_content"
                        value={formData.post_content}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="lable" htmlFor="category_id">تصنيف المنشور</label>
                    <input
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="lable" htmlFor="source_id">مصدر المنشور</label>
                    <select
                        id="source_id"
                        name="source_id"
                        value={formData.source_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">اختر مصدر المنشور</option>
                        {sources.map(source => (
                            <option key={source.source_id} value={source.source_id}>
                                {source.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="lable" htmlFor="post_image_path">صورة المنشور</label>
                    <br/>
                    <input 
                        className="form-control"
                        type="file" 
                        id="post_image_path" 
                        name="post_image_path"
                        onChange={handleFileChange}
                    /> 
                </div>
                {/* Submit and cancel buttons */}
                <div className="btn-container1">
                    <button type="submit" className="btn-submit" style={{width:"30%"}}>
                        إنشاء المنشور
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
                message="تم إنشاء المنشور بنجاح"
                onClose={() => setShowSuccessAlert(false)}
                customCloseBtnText= 'تم '
            />
        </div>
    );
}
