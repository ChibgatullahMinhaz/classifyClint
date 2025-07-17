import React from "react";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAuth from "../Hook/useAuth";

const AdminRoutes = ({ children }) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (userRole?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoutes;
