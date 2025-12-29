import React from "react";
import Navber from "../Pages/Navber";
import { Outlet } from "react-router";
import Footer from "../Pages/Footer";

//Toaster
const Root = () => {
  return (
    <div>
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
