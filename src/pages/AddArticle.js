import React, { useState } from 'react';
import '../styles/AddArticle.css'

 import SideBar from '../components/SideBar'
 
 const AddArticle = () => {
  
  const [name, setName] = useState("");
    return ( 
      <div>
        {/* <SideBar/> */}
        
        <form>
      <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </form>





         {/* <form >
         <h2 dir="rtl" className='arts '> المقالات</h2>
         <hr/>
          <h3 className='add'>اضافة مقال</h3>

         </form> */}
         {/* <div  dir="rtl" className='search'>
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
            </button>   */}
             {/* <form class="d-flex" role="search" className='search'>
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search "
              aria-label="Search"
            />
              <span class="material-icons-outlined">search</span>
          </form> */}


          {/* 
          <Form>
            <Form.Group>
              <Form.Control type='text'  placeholder='....بحث' className='search'/>
              {/* <span class="material-icons-outlined">search</span> 
            </Form.Group>

          </Form> 
        */}

      </div>
     );
 }
  
 export default AddArticle;