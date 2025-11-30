import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useApp();
    const location = useLocation();

    if (!user || !user.setupComplete) {
        // Redirect to setup, but save the intended location
        return <Navigate to="/setup" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
