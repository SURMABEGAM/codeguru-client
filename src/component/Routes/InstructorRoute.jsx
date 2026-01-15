import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useRole from "../../hooks/useRole";
import { Navigate } from "react-router";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role !== "instructor") {
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
};

export default InstructorRoute;
