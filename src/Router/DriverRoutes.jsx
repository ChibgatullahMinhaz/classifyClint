// src/routes/DriverRoute.jsx
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAuth from "../Hook/useAuth";

const DriverRoute = ({ children }) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (userRole?.role !== "teacher") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default DriverRoute;
