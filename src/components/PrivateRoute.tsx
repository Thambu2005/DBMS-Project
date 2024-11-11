import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  role: 'student' | 'staff';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!user || user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;