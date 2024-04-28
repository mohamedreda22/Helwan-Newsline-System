import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ isAuthenticated, logout }) => {
    console.log('Is user authenticated?', isAuthenticated);



    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace={true} state={{ from: '/logout' }} />;
}
