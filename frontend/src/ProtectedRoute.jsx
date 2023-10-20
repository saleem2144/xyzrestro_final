import React, { useContext } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = ({ children, roles, ...rest }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return (
    user.isAuthenticated && roles.includes(user.role) ? (
      <Routes>
        <Route {...rest} element={children} />
      </Routes>
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
  );
};

export default ProtectedRoute;
