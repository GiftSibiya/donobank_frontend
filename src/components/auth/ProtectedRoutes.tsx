import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@/stores/data/AuthStore';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[]; // Roles allowed to access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { sessionUser } = useAuthStore();

  // Check if user is authenticated
  if (!sessionUser) {
    return <Navigate to="/" replace />;
  }

  // Check if user has the required role
  if (!allowedRoles.includes(sessionUser.role)) {
    alert('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
