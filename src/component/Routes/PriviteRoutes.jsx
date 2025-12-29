import React, { use } from "react";
import { AuthContext } from "../context/context";
import { Navigate } from "react-router";

const PriviteRoutes = ({ children }) => {
  //const { user, loadin } = useContext(AuthContext);
  // if (loadin) {
  //  return <p className="text-center mt-10">Loading...</p>;
  //}
  // if (!user) return <Navigate to="/login" />;
  // return children;
  const { user, loading } = use(AuthContext);
  //   console.log(user);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PriviteRoutes;
