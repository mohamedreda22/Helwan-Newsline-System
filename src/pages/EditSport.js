import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/EditEvent.css";
import Simplert from 'react-simplert'

export default function EditSport({ sport, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        sport_address: sport?.sport_address || "",
        sport_content: sport?.sport_content || "",        
        sport_image: sport?.sport_image || "",
        sport_source_id: sport?.sport_source_id || "",
        category_id: sport?.category_id || "",


    });

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [sources, setSources] = useState([]);
    const [categories, setCategories] = useState([]);

    


    useEffect(()=>{
        setFormData({
            ...formData,
            sport_address: sport?.sport_address || "",
            sport_content: sport?.sport_content || "",
            sport_source_id: sport?.sport_source_id || "",
            category_id: sport?.category_id || "",

        })
    },[sport])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:9090/university/sports/${sport.sport_id}`, formData);
            
            if (response &&(response.status === 200 || response.status ===202)) {
                setShowSuccessAlert(true);
                onSave(formData);
                setTimeout(() => {
                    window.location.reload();
                  }, 1000);
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
                    sport_image: reader.result,
                })
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="add-event-page" style={{padding:"50px",marginRight:"80px",scale:"105%"}}>
        <div className="edit-event-container" dir="rtl" >
            <h2 className="header" style={{paddingRight:"10%"}}>تعديل الرياضة</h2>
            <form onSubmit={handleSubmit} >
                <div className="form-group" style={{marginTop:"10px"}}>
                    <label className="lable" htmlFor="sport_address">عنوان الرياضة</label>
                    <input
                        id="sport_address"
                        name="sport_address"
                        value={formData.sport_address}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group" style={{marginTop:"10px"}}>
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
                <div className="form-row" style={{marginTop:"10px"}}>
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
                <div className="form-group" >
            <label className='lable'>التصنيف</label>
            <select 
              as="select" 
              name="category_id" 
              value={formData.category_id} 
              onChange={handleChange} 
              required 
            >
              <option value="">اختر التصنيف</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
                </div>
                <div className="form-group" style={{marginTop:"10px"}}>
                    <label className="lable" htmlFor="sport_image">تعديل الصورة</label>
                    <br/>
                    <input 
                        className="form-control"
                        type="file" 
                        id="sport_image" 
                        name="sport_image"
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
