import React from 'react'; 
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../assets/images/logo.png";
import '../styles/SideBar.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SideBar  ()  {
    const handleExit=()=>{
        sessionStorage.removeItem('token');
        window.location.href = '/';
    }
    return ( 
        <div className='sideBar' dir="rtl">
            <div className="logo">
            <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }} />
            </div>
            <div className="menuItemWrapper">
            <Sidebar className='side2'>
                <Menu>
                  <SubMenu label=" اهم الاحداث">
                     <Nav.Link as={Link} to="/addEvent" className='active'>
                        <span className="material-icons-outlined">add</span> اضافة حدث
                     </Nav.Link>
                     <Nav.Link as={Link} to="/showEvents" className='active'>
                        <span className="material-icons-outlined">calendar_month</span> كل الاحداث
                    </Nav.Link>
                  </SubMenu>
                  <SubMenu label=" الرياضة" >
                     <Nav.Link as={Link} to="/addSport" className='active'>
                        <span className="material-icons-outlined">add</span> اضافة رياضة
                     </Nav.Link>
                     <Nav.Link as={Link} to="/showSports" className='active'>
                        <span className="material-icons-outlined">sports_football</span> كل الرياضات 
                    </Nav.Link>
                  </SubMenu>
                    <SubMenu label="المقالات">
                        <Nav.Link href="addarticle" className='active'>
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
                        <Nav.Link href="videoList" className='active'>
                            <span className="material-icons-outlined">play_circle</span> كل الفيديوهات
                        </Nav.Link>
                    </SubMenu>
{/*                     <Nav.Link href="notifications" className='active'>
                        <span className="material-icons-outlined">add_alert</span> الاشعارات
                    </Nav.Link> */}
                     <SubMenu label=" اهم الاخبار" >
                     <Nav.Link as={Link} to="/addNews" className='active'>
                        <span className="material-icons-outlined">add</span> اضافة خبر
                     </Nav.Link>
                     <Nav.Link as={Link} to="/showNews" className='active'>
                        <span className="material-icons-outlined">newspaper</span> كل الأخبار 
                    </Nav.Link>
                  </SubMenu>               
                    <SubMenu label="منشور ">
                        <Nav.Link href="addPost" className='active'>
                            <span className="material-icons-outlined">add</span> اضافة منشور
                        </Nav.Link>
                        <Nav.Link href="showPosts" className='active'>
                            <span className="material-icons-outlined">assistant</span> كل المنشورات
                        </Nav.Link>
                    </SubMenu>
                    <Nav.Link as={Link} to="/faq" className='active'>
                        <span className="material-icons-outlined">question_mark</span> الاسئلة الشائعة
                    </Nav.Link>
                    {[...Array(1)].map((_, index) => <MenuItem key={index}></MenuItem>)}
                    <Nav.Link as={Link} to="/logout" onClick={handleExit} className='active'>
                        <span className="material-icons-outlined">logout</span> تسجيل الخروج
                    </Nav.Link>

                </Menu>
            </Sidebar>
            </div>
        </div>
    );
}