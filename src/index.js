import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import  {RouterComponent}  from './routes/Routes'; 
import { UserRoleProvider } from './hooks/UserRoleContext';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  //<React.StrictMode>
    <UserRoleProvider>
    <RouterComponent /> {/* Render your RouterComponent */}
    </UserRoleProvider>
  //</React.StrictMode>
);
