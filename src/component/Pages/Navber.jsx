import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/context";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <header className="bg-white shadow fixed w-full z-50">
      vc vg
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

          {!user ? (
            <NavLink
              to="/login"
              className="bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logOut}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
