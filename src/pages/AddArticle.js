import React from 'react';
import '../styles/AddArticle.css'
//import SideBar from './components/SideBar'
import SideBar from '../components/SideBar'
 
 const AddArticle = () => {
    return ( 
      <div>
        <SideBar/>
{/*         
           <div className='Search'>
           <input type ="text" placeholder='...بحث ' ></input>
          </div> */}
          <h2 dir="ltr"> المقالات</h2>
          <h3>اضافة مقال</h3>

            <label>
                <span> العنوان</span>
                <input type='text' />
            </label>
            <label>
                <span>  المصدر</span>
                <input type='text' />
            </label>
            <label>
              <span>المقال</span>
            <textarea name="subject" id="" cols="30" rows="10" placeholder="test text"></textarea>
            </label>   
      </div>
     );
 }
  
 export default AddArticle;