import React,{useState, useCallback} from 'react';
import '../styles/AddVideo2.css';
import SideBar from '../components/SideBar';
import { useDropzone } from 'react-dropzone';

const AddVideo3 = () => {
 
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        event_address: "",
        category_id: "", 
        description: "",
        source: "", 
        event_image_path: "", 
    });
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.event_address || !formData.category_id ) {
            setError('برجاء ملئ كل البيانات');
            return;
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the video file, like upload it to a server
        console.log(acceptedFiles);
      }, []);

      const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'video/*' });
    return ( 
        <div className="add-event-page">
             <SideBar />
             <h3>اهم الاحداث</h3>
             <div className="add-event-container">
             <h1 className="header">إضافة حدث</h1>
             <form onSubmit={handleSubmit}>
             <div className="form-row" dir='rtl'>
                        <div className="form-group1">
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
                    
                     <div className="form-group2">
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
                   
                    </div>
                    <div className="form-row" dir='rtl'>
                    <div className="form-group3 ">
                    <label  dir='rtl' className="lable" htmlFor="category_id">التصنيف</label>
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
                    <div className="form-row" dir='rtl'>
                    <div className="form-group4">
                        <label dir='rtl' className="lable" htmlFor="description">الوصف</label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    </div>

                    <div {...getRootProps()} style={{
                        
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        height:'180px'


                    }}>
                      <input {...getInputProps()} />
                      <p> 
                      <span className="material-icons-outlined">file_upload</span>
                        اختار الفيديو 
                      </p>
                    </div>
                 <div>
                 <button type="submit" disabled={isLoading} className="btn-submit">
                        {isLoading ? 'جاري إضافة  المقال' : ' حفظ  '}
                    </button>
                    </div>
                   
             </form>
             </div>
        </div>
     );
}
 
export default AddVideo3;