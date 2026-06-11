import React from "react";
import Navber from "../Pages/Navber";
import { Outlet } from "react-router";
import Footer from "../Pages/Footer";

//Toaster
const Root = () => {
  return (
    <div className="flex min-h-screen flex-col ">
      <main className="min-h-screen">
        <Navber></Navber>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Root;
