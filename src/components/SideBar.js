import React from 'react'; 
import {Sidebar,Menu,MenuItem,SubMenu,} from 'react-pro-sidebar';
import Form from 'react-bootstrap/Form';
import logo from "../assets/images/logo.png";
import '../styles/SideBar.css';
import {Nav} from 'react-bootstrap';
const SideBar = () => {
    return ( 
         <div className='Side'  dir="rtl">
            <Form>
            <Form.Group>
            <Form.Control type='text'  placeholder=' بحث....' className='search'/>
              {/* <span className='bar' class="material-icons-outlined">search</span> */}
            </Form.Group>

          </Form>
            
              <Sidebar className='sidebar'>
              <div className="logo">
            <img src={logo} alt="logo"  
            width="100px"
              height="100" 
               />
             </div>
             <Menu>
             <MenuItem></MenuItem>
             <Nav.Link href="#h" className='active' ><span class="material-icons-outlined">calendar_month</span> اهم الاحداث</Nav.Link>
             <Nav.Link href="#ho" className='active' ><span class="material-icons-outlined"> sports_football</span>    الرياضة</Nav.Link>
             <SubMenu   label="المقالات"  >
                
                <Nav.Link href="#hom" className='active' ><span class="material-icons-outlined"> add</span>   اضافة مقال </Nav.Link>
                <Nav.Link href="#hom" className='active' ><span class="material-icons-outlined">article</span>    كل المقالات   </Nav.Link>
             </SubMenu>
             <SubMenu   label="كل الفيديوهات"  >
                 
                <Nav.Link href="#home" className='active' ><span class="material-icons-outlined"> add</span>   اضافة  فيديو </Nav.Link>
                <Nav.Link href="#home" className='active' ><span class="material-icons-outlined">play_circle</span>    كل  الفيديوهات   </Nav.Link>
             </SubMenu >
                
              < Nav.Link href="#homeP" className='active' ><span class="material-icons-outlined"> add_alert </span>   الاشعارات    </Nav.Link>
               <Nav.Link href="#homePA" className='active' ><span class="material-icons-outlined">newspaper </span>     اهم الاخبار     </Nav.Link>
               < Nav.Link href="#homEE" className='active' ><span class="material-icons-outlined"> assistant</span>     منشور  </Nav.Link>
                <Nav.Link href="#homNN" className='active' ><span class="material-icons-outlined">question_mark </span>     الاسئلة الشائعة     </Nav.Link>
               
               <MenuItem></MenuItem>
               <MenuItem></MenuItem>
               <MenuItem></MenuItem>
               <MenuItem></MenuItem>
               
               
               
               <Nav.Link href="#homNN" className='active' ><span class="material-icons-outlined"> logout </span>      تسجيل الخروج       </Nav.Link>
              </Menu>
            
            </Sidebar>
            </div>
             

        
         
        
    
     );
}
 
export default SideBar;
 
                