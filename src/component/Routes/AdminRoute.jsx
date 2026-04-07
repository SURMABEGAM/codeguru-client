import React, { Children, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useRole from "../../hooks/useRole";
import { Navigate } from "react-router";
import Loader from "../home/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
