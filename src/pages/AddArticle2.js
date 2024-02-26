import React ,{ useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import SideBar from '../components/SideBar';
import '../styles/AddArticle2.css'


const AddArticle2 = () => {


    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        article_address: "",
        category_id: "", 
        description: "",
        source: "", 
        article:"",
      
       
    });

    const [error, setError] = useState('');
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
        // هنا يمكنك التعامل مع الملفات المقبولة (acceptedFiles)
        // مثلاً، يمكنك إجراء إرسال الصورة إلى الخادم أو عرضها مباشرة في التطبيق
        console.log(acceptedFiles);
      }, []);
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    
    
   

     
    return ( 
        <div className="addArticle">
            <SideBar/>
            {/* <form className= 'search'>
            
              < input   dir='rtl' type='text'  placeholder='....بحث' className='search2'/>
               {/* <span className='search3' class="material-icons-outlined">search</span>  
            

          </form>  */}
            
            <h3  > المقالات  </h3>
        <hr/>
            <div className="add-article-container">
            <h1 className="header">   اضافه مقال</h1>
            <form onSubmit={handleSubmit} >
            <div className="form-row " dir='rtl'>
                   <div className="form-group">
                      <label    className="lable1" htmlFor="article_address">العنوان</label>
                        <input
                                type="text"
                                id="article_address"
                                name="article_address"
                                value={formData.article_address  }
                                onChange={handleChange}
                                className="form-control"
                                required
                        />
                    </div>
                    <div className="form-group4">
                        <label className="lable2" htmlFor="source">المصدر</label>
                        <input
                            type="text"
                            id="source"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            className="form-control"
                        />
                </div> 
                <div className="form-group3">
                        <label className="lable3" htmlFor="event_image_path" ></label>
                              {/* <br></br>  <span style={{color: 'red'}}>
                                    disabled cause of backend API handle
                                </span> */}
                    <div {...getRootProps()} style={ {
                                border: 'none',
                                borderRadius: '4px',
                                padding: '20px',
                                 textAlign: 'center',
                                  cursor: 'pointer',
                                  width:'750px',
                                  height:'79px',
                                  marginRight:'-220px',

        }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>قم بإسقاط الملف هنا...</p>
      ) : (
                                    <p>       
                                        <span className="material-icons-outlined">file_upload</span>    
                                        رفع الصورة  
                                        
                                            </p>
      )}
    </div>

     
                                          

 
 
                 </div>

                 <div className="form-group2">
                        <label className="lable4" htmlFor=" article"> المقال</label>
                        <textarea
                            type="text"
                            id="article "
                            name=" article"
                            value={formData.article}
                            onChange={handleChange}
                            className="form-control4"
                        />
                </div> 

               
                <button type="submit" disabled={isLoading} className="btn-submit">
                        {isLoading ? 'جاري إضافة  المقال' : ' حفظ  '}
                    </button>
            </div>
            </form>

            </div>
            
        </div>
     );
}
 
export default AddArticle2;