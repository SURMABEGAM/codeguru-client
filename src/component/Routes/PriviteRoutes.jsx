import React, { use } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const PriviteRoutes = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && user?.email) return children;

  {
    return <Navigate to="/login" state={location.pathname} replace />;
  }
};

export default PriviteRoutes;
