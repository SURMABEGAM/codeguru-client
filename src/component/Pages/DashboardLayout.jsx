import React from "react";
import { NavLink, Outlet } from "react-router";
import useRole from "../../hooks/useRole";

const DashboardLayout = () => {
  const { role, loading } = useRole();

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-3">
          {/* Common links */}
          <NavLink to="/dashboard" end>
            Home
          </NavLink>
          <NavLink to="/dashboard/profile">Profile</NavLink>

          {/* 🔥 STUDENT */}
          {role === "student" && (
            <>
              <NavLink to="/dashboard/my-courses">My Courses</NavLink>
              <NavLink to="/dashboard/payments">Payments</NavLink>
            </>
          )}

          {/* 🔥 INSTRUCTOR */}
          {role === "instructor" && (
            <>
              <NavLink to="/dashboard/add-course">Add Course</NavLink>
              <NavLink to="/dashboard/my-courses">My Courses</NavLink>
            </>
          )}

          {/* 🔥 ADMIN */}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
              <NavLink to="/dashboard/manage-courses">Manage Courses</NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
