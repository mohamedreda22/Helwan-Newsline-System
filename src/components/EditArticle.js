import React, { useState, useEffect } from "react";
import axios from "axios";
import Simplert from 'react-simplert'
import "../styles/EditEvent.css";
import Row from "react-bootstrap/Row";

export default function EditArticle({ article, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        article_address: article?.article_address || "",
        article_content: article?.article_content || "",        
        article_image_path: article?.article_image_path || "",
        source_id: article?.source_id || "",
        category_id: article?.category_id || "",
        source_string: article?.source_string || "",

    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        setFormData({
            article_address: article?.article_address || "",
            article_content: article?.article_content || "",
            source_id: article?.source_id || "",
            article_image_path: article?.article_image_path || "",
            source_string: article?.source_string || "",
            category_id: article?.category_id || "",

        });
    }, [article]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:9090/university/articles/${article.article_id}`, formData);
            
            if (response &&(response.status === 200 || response.status ===201|| response.status ===202)) {
                setShowSuccessAlert(true);
                onSave(formData);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setShowErrorAlert(true);
            }
        } catch (error) {
            console.error('Error updating article:', error);
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

    const handleFileChange = (event) => {
        const file = event.target.files[0] ;
        const reader = new FileReader();
        
        if (file) {
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    article_image_path: reader.result,
                })
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="add-event-page" style={{padding:"50px",marginRight:"80px",scale:"105%"}}>
        <div className="edit-event-container" dir="rtl">
            <h2 className="header" style={{paddingRight:"10%"}}>تعديل المقالة</h2>
            <form onSubmit={handleSubmit} >
            <div className="form-row" style={{marginTop:"10px"}}>
                <div className="form-group">
                    <label className="lable" htmlFor="article_address">عنوان المقالة</label>
                    <input
                        id="article_address"
                        name="article_address"
                        value={formData.article_address}
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
                            <option key={category.category_id} value={category.category_id}>
                                {category.category_name}
                            </option>
                        ))}
                    </select>
                </div>
                </div>
                <div className="form-group" style={{marginTop:"15px"}}>
                    <label className="lable" htmlFor="article_content">محتوى المقالة</label>
                    <textarea
                        id="article_content"
                        name="article_content"
                        value={formData.article_content}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <Row className="article-form-row">
                <div className="form-group" style={{marginTop:"10px"}}>
                    <label className="lable" htmlFor="source_id">المصدر </label>
                    <select
                        id="source_id"
                        name="source_id"
                        value={formData.source_id}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">اختر المصدر </option>
                        {sources.map(source => (
                            <option key={source.source_id} value={source.source_id}>
                                {source.full_name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group" style={{marginTop:"10px"}}>
                    <label className="lable" htmlFor="article_address"> مصدر المقال</label>
                    <input
                        id="source_string"
                        name="source_string"
                        value={formData.source_string}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                </Row>
                <div className="form-group" style={{marginTop:"10px"}}>
                    <label className="lable" htmlFor="article_image_path">تعديل الصورة</label>
                    <br/>
                    <input 
                        className="form-control"
                        type="file" 
                        id="article_image_path" 
                        name="article_image_path"
                        onChange={handleFileChange}
                    /> 
                </div>
                {/* Submit and cancel buttons */}
                <div className="btn-container1" style={{padding:"0px",marginTop:"10px"}}>
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
        </div>
    );
}
