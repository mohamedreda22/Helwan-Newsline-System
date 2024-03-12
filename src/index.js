import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterComponent } from './routes/Routes'; 

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <RouterComponent /> {/* Render your RouterComponent */}
  </React.StrictMode>,
);
