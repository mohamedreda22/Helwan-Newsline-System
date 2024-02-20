import React from 'react';
import '../styles/AddArticle.css'
 
 import SideBar from '../components/SideBar'
 
 const AddArticle = () => {
    return ( 
      <div>
        <SideBar/>
        
         
         <div  dir="rtl" className='search'>
           <input type ="text" placeholder='بحث .....' ></input>
           <span class="material-icons-outlined">search</span>
          
         </div>
          <h2 dir="rtl" className='arts '> المقالات</h2>
          <h3 className='add'>اضافة مقال</h3>

             
                <h5 dir="rtl" className='add2' > العنوان</h5>
                <input  type='text' className='txt' />

                <h5   className='add3' >  المصدر</h5>
                <input   type='text' className='txt2' />
            
            
          
              <h5 dir="rtl" className='add4'>المقال</h5>
            <textarea  className="subject" id="" cols="30" rows="10" placeholder="test text"></textarea>

            <button className='btn'>
                حفظ
            </button>  
      </div>
     );
 }
  
 export default AddArticle;