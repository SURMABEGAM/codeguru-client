import React from "react";
import Navber from "../Pages/Navber";
import { Outlet } from "react-router";
import Footer from "../Pages/Footer";

//Toaster
const Root = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-blue-300 to-blue-200 dark:from-gray-800 dark:to-gray-900">
      <main className="min-h-screen">
        <Navber></Navber>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Root;
