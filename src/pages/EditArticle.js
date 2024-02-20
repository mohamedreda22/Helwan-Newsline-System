// import React from 'react';
import React, { Component } from 'react'

import '../styles/EditArticle.css'

class EditArticle extends Component {

    handleClick =()=>{
           console.log(this.state.Name)
         }

         change =()=>{
            console.log(this.state.Age)
          }
    state = { 
        Name:'Child',
        Age:22,
     } 
    render() { 
        return (
            <div>
                       <p >تعديل المقال</p>
                          <h5 dir="rtl" className='add2' > العنوان</h5>
                           <input  type='text' className='txt' />
            
                            <h5   className='add3' >  المصدر</h5>
                              <input   type='text' className='txt2' />
             
                           
                          <textarea  className="subject" id="" cols="30" rows="10"  ></textarea>
            
                          <button  onClick={this.change} className='btn'> حفظ</button> 
             
            
                         <button  onClick={this.handleClick} className='btn3'> الغاء الامر</button>
                          
                      </div>
        );
    }
}
 
export default EditArticle;
// const EditArticle = () => {
//       handleClick =()=>{
//     console.log(this.state.Name)
//   }
//     return ( 
//         <div>
//             <p >تعديل المقال</p>
//                <h5 dir="rtl" className='add2' > العنوان</h5>
//                 <input  type='text' className='txt' />

//                 <h5   className='add3' >  المصدر</h5>
//                 <input   type='text' className='txt2' />
 
               
//             <textarea  className="subject" id="" cols="30" rows="10" placeholder="test text"></textarea>

//             <button className='btn'>
//                 حفظ
//             </button> 
 

//            <button className='btn3'> الغاء الامر</button>
//            <button onClick={this.handleClick}> Click Here </button>
//         </div>
//      );
// }
 
// export default EditArticle;