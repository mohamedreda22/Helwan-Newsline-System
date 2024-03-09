import React from 'react'; 
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../assets/images/logo.png";
import '../styles/SideBar.css';
import { Nav } from 'react-bootstrap';

export default function SideBar  ()  {
    return ( 
        <div className='sideBar' dir="rtl">

            
            <div className="logo">
            <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }} />
            </div>
            <div className="menuItemWrapper">
            <Sidebar className='side2'>
                <Menu>
                  <SubMenu label=" اهم الاحداث">
                     <Nav.Link href="addEvent" className='active'>
                        <span className="material-icons-outlined">add</span> اضافة حدث
                     </Nav.Link>
                     <Nav.Link href="showEvents" className='active'>
                        <span className="material-icons-outlined">calendar_month</span> كل الاحداث
                    </Nav.Link>

                  </SubMenu>

                    <Nav.Link href="#sports" className='active'>
                        <span className="material-icons-outlined">sports_football</span> الرياضة
                    </Nav.Link>
                    <SubMenu label="المقالات">
                        <Nav.Link href="/" className='active'>
                            <span className="material-icons-outlined">add</span> اضافة مقال
                        </Nav.Link>
                        <Nav.Link href="articles" className='active'>
                            <span className="material-icons-outlined">article</span> كل المقالات
                        </Nav.Link>
                    </SubMenu>
                    <SubMenu label="كل الفيديوهات">
                        <Nav.Link href="addVideo" className='active'>
                            <span className="material-icons-outlined">add</span> اضافة فيديو
                        </Nav.Link>
                        <Nav.Link href="allvids" className='active'>
                            <span className="material-icons-outlined">play_circle</span> كل الفيديوهات
                        </Nav.Link>
                    </SubMenu>
                    <Nav.Link href="#notifications" className='active'>
                        <span className="material-icons-outlined">add_alert</span> الاشعارات
                    </Nav.Link>
                    <Nav.Link href="#topNews" className='active'>
                        <span className="material-icons-outlined">newspaper</span> اهم الاخبار
                    </Nav.Link>
                    <Nav.Link href="#Post" className='active'>
                        <span className="material-icons-outlined">assistant</span> منشور
                    </Nav.Link>
                    <Nav.Link href="#faq" className='active'>
                        <span className="material-icons-outlined">question_mark</span> الاسئلة الشائعة
                    </Nav.Link>
                    {[...Array(2)].map((_, index) => <MenuItem key={index}></MenuItem>)}
                    <Nav.Link href="logInTop"  className='active'>
                        <span className="material-icons-outlined">logout</span> تسجيل الخروج
                    </Nav.Link>
                </Menu>
            </Sidebar>
            </div>
        </div>
    );
}