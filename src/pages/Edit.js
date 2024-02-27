// import React,{useState, useCallback} from 'react';
// import { useDropzone } from 'react-dropzone';
// import "../styles/Edit.css"
// const Edit = ({ event, onSave, onCancel }) => {
     
//     const [formData, setFormData] = useState({
//     // event_address: event.event_address || "",
//     // category_id: event.category_id || "",
//     // source: event.source || "",
//     })
     

      
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
   
//     const onDrop = useCallback(acceptedFiles => {
//         // هنا يمكنك التعامل مع الملفات المقبولة (acceptedFiles)
//         // مثلاً، يمكنك إجراء إرسال الصورة إلى الخادم أو عرضها مباشرة في التطبيق
//         console.log(acceptedFiles);
//       }, []);
    
//       const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//     return ( 
//             <div  className="editVideo">
//                   <div className="editVideocontainer">
//                 <h1 className="header">  تعديل المقال  </h1>
//                  <form  >
//                  <div className="form-row1" dir='rtl'>
//                  <div className="form-group9">
//                         <label className="lable9" htmlFor="event_address">العنوان</label>
//                         <input
//                                 type="text"
//                                 id="event_address"
//                                 name="event_address"
//                                 value={formData.event_address}
//                                 onChange={handleChange}
//                                 className="form-control9"
//                                 required
//                         />
//                     </div>
                    
//                      <div className="form-group10">
//                         <label className="lable10" htmlFor="source">المصدر</label>
//                         <input
//                             type="text"
//                             id="source"
//                             name="source"
//                             value={formData.source}
//                             onChange={handleChange}
//                             className="form-control10"
//                         />
//                         </div> 
                   
//                     </div>
                  
                   
//                  </form>
//                  </div>
//             </div>

        
    
//      );
// }
 
// export default Edit;