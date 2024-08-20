import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserRole } from '../../redux/feature/user/userSlice';


const RoleBasedRoute = ({ children, roles }) => {
  const userRole = useSelector(selectUserRole);
  console.log("RoleBasedRoute - User Role:", userRole); // Debug statement

  if (!roles.includes(userRole)) {
    console.log("RoleBasedRoute - Access Denied"); // Debug statement
    return <Navigate to="/" />;
  }

  return children;
};

export default RoleBasedRoute;
