import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import { RouterProvider } from 'react-router-dom';
// import {router} from './routes/Routes'
 import 'bootstrap/dist/css/bootstrap.min.css'

 import { RouterComponent } from './routes/Routes'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   {/* <App /> */}
  //   {/* <SideBar/> */}
  //   {/* <AddArticle/> */}
  //   <Navbar/>
  //   {/* <Footer/> */}
  //   <Message/>
  // </React.StrictMode>
  <React.StrictMode>
  <RouterComponent /> {/* Render your RouterComponent */}
</React.StrictMode>,
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
