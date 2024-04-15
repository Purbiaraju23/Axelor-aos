import useAuth from "app/Contexts/AuthContext";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, redirect = "/" }) => {
  const { AuthStatus } = useAuth();

  if (!AuthStatus) {
    return <Navigate to={redirect} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
