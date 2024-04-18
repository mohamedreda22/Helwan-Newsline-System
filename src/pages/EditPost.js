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
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setFormData({
            post_content: post?.post_content || "",
            category_id: post?.category_id || "",
            source_id: post?.source_id || "",
            source_string: post?.source_string || "",
            post_image_path: post?.post_image_path || "",
            category_id: post?.category_id || "",

        });
    }, [post]);

    useEffect(() => {
        fetchSources();
        fetchCategories();
    }, []);

    const fetchSources = async () => {
        try {
            const response = await axios.get('http://localhost:9090/university/sources');
            setSources(response.data);
        } catch (error) {
            console.error('Error fetching sources:', error);
        }
    };
    const fetchCategories = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9090/university/categories"
          );
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:9090/university/posts/${post.post_id}`, formData);
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
        <div className="add-event-page" style={{padding:"40px",marginRight:"80px",scale:"105%"}}>
        <div className="edit-event-container" dir="rtl">
            <h2 className="header" style={{paddingRight:"10%"}}>تعديل المنشور </h2>
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
                        rows={4}
                    />
                </div>                
                <div className="form-group">
                    <label className="lable" htmlFor="source_string">مصدر المنشور</label>
                    <textarea
                        id="source_string"
                        name="source_string"
                        value={formData.source_string}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-row" style={{marginTop:"10px"}}>
                <div className="form-group">
                    <label className="lable" htmlFor="source_id">المصدر </label>
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
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                </div>
                <div className="form-group" style={{marginTop:"10px"}}>
                    <label className="lable" htmlFor="post_image_path">تعديل صورة المنشور</label>
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
                <div className="btn-container1" style={{padding:"0px",marginTop:"10px"}}>
                    <button type="submit" className="btn-submit" style={{width:"30%"}}>
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
                message="تم إنشاء المنشور بنجاح"
                onClose={() => setShowSuccessAlert(false)}
                customCloseBtnText= 'تم '
            />
        </div>
        </div>
    );
}
