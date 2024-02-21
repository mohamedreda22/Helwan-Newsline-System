import React ,{ useState,useEffect } from "react";
import axios from "axios";
import '../styles/AddEvent.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


export default function AddEvent(){
    const [formData, setFormData] = useState({
        event_address: "",
        category_id: "", 
        description: "",
        source: "", 
        event_place: "", 
        event_date: "",
        event_time: "",
        event_broadcast: "", 
        event_link_path: "", 
        event_image_path: "", 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [eventDate, setEventDate] = useState(null);

    const handleDateChange = (date) => {
        setEventDate(date);
    };


    useEffect(() => {
        // Fetch categories from the server when the component mounts
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

    // Submit form handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.event_address || !formData.category_id ) {
            setError('برجاء ملئ كل البيانات');
            return;
        }
        const formattedDate = eventDate ? formatDate(eventDate) : ''; // Check if eventDate is set

        setIsLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:9090/university/events',
                {...formData, event_date: formattedDate}
                );
            console.log('Response:', response);
            if (response && response.status === 200) {
                alert('تم إضافة الحدث بنجاح');
                console.log('Form data submitted:', response.data);
                resetForm();
            } else {
                alert('فشل إضافة الحدث');
                console.log('Response data:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Response data:', error.response ? error.response.data : '');
            alert('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    // Function to format date as dd-MM-yyyy
const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value,
        });
    };
  /*   const handleFileChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the input
    
        const reader = new FileReader();
    
        reader.onloadend = () => {
            const base64String = reader.result;
            
            setFormData({
                ...formData,
                event_image_path: base64String,
            });
        };
    
        reader.readAsDataURL(file);
    }; */
    


    // Reset form
    const resetForm = () => {
        setFormData({
            event_address: "",
            category_id: "", 
            description: "",
            source: "", 
            event_place: "", 
            event_date: "",
            event_time: "",
            event_broadcast: "", 
            event_link_path: "", 
            event_image_path: "", 
        });
        setError('');
        setEventDate(null);
    };
        //base64 for images or videos

    return(
        <div className="add-event-page">
            <h3>اهم الاحداث</h3>
            <div className="add-event-container">
                <h1 className="header">إضافة حدث</h1>
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
                                required
                        >
                                <option value="">اختر التصنيف</option>
                                {categories.map(category => (
                                    <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                ))}
                            </select>

                    </div> 
                    </div>
                 
                    <div className="form-group">
                        <label className="lable" htmlFor="description">الوصف</label>
                        <input
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
                <div className="form-row"> 
                    <div className="form-group">
                        <label className="lable" htmlFor="event_date">التاريخ</label>
{/*                             <input
                            type="date"
                            id="event_date"
                            name="event_date"
                            value={formData.event_date}
                            onChange={handleChange}
                            className="form-control"
                            /> */}
                           <DatePicker
                            selected={eventDate}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            className="form-control"
                            name="event_date"
                            id="event_date"

                            />
                    </div>
                        <div className="form-group">
                        <label className="lable" htmlFor="event_time">الساعة</label>
                        <input
                            type="text"
                            id="event_time"
                            name="event_time"
                            value={formData.event_time}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="HH:mm AM/PM"
                        />
                        
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
                        <label className="lable" htmlFor="event_image_path">رفع الصورة</label>
                              <br></br>  <span style={{color: 'red'}}>
                                    disabled cause of backend API handle
                                </span>
{/*                         <input
                            type="file"
                            id="event_image_path"
                            name="event_image_path"
                            value={formData.event_image_path}
                            onChange={(e) => handleFileChange(e)}
                            className="form-control"
                        /> */}
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-submit">
                        {isLoading ? 'جاري إضافة الحدث' : 'إضافة الحدث'}
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )
}