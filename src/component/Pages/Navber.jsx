import React, { useContext } from "react";
import { Link, NavLink } from "react-router";

import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from CodeGuru",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire(
            "Logged Out!",
            "You have successfully logged out.",
            "success"
          );
        });
      }
    });
  };

  return (
    <header className="bg-white shadow fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Code<span className="text-indigo-500">Guru</span>
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-6 items-center font-medium text-gray-800">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/courses">Courses</NavLink>

          {user && <NavLink to="/dashboard">Dashboard</NavLink>}

          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL}
                alt="user"
                title={user.displayName}
                className="w-9 h-9 rounded-full border"
              />

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "bg-indigo-600 text-white px-4 py-2 rounded" : ""
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
