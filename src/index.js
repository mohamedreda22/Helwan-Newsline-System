import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import SideBar from './components/SideBar';
 
 import 'bootstrap/dist/css/bootstrap.min.css'
//import AddArticle from './pages/AddArticle';
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <SideBar/>
    {/* <AddArticle/> */}
  </React.StrictMode>
);
