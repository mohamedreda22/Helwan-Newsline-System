import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ isAuthenticated, logout }) => {
    console.log('Is user authenticated?', isAuthenticated);

    const handleLogout = () => {
        logout(); // Call the logout function to clear user's session
    };

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace={true} state={{ from: '/logout' }} />;
}
