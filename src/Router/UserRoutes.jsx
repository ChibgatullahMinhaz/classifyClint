// src/routes/UserRoute.jsx
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import useAuth from "../Hook/useAuth";

const UserRoutes = ({ children }) => {
  const { user, loading, userRole } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (userRole?.role !== "student") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default UserRoutes;
