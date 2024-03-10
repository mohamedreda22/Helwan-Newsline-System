import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ isAuthenticated }) => {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
