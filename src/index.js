import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
<<<<<<< HEAD
import { RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {router} from './routes/Routes'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>

=======
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
>>>>>>> main
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
