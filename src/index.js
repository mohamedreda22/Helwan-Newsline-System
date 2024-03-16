import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterComponent } from './routes/Routes'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <RouterComponent />
</React.StrictMode>,
 
);

reportWebVitals();
