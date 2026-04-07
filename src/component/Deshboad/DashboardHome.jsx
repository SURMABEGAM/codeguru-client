import React from "react";
import { FaBook, FaUsers, FaChalkboardTeacher } from "react-icons/fa";
const DashboardHome = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <h2 className="text-3xl font-bold text-indigo-600 mt-10">Dashboard</h2>
      <p className="mt-2 text-slate-600">
        Welcome back! Here’s what’s happening today.
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Total Courses */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:shadow-2xl transition duration-300">
          <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full text-2xl">
            <FaBook />
          </div>
          <div>
            <h4 className="text-lg text-indigo-600 font-semibold">
              Total Courses
            </h4>
            <p className="text-slate-500">12 Courses</p>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:shadow-2xl transition duration-300">
          <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full text-2xl">
            <FaUsers />
          </div>
          <div>
            <h4 className="text-lg text-emerald-600 font-semibold">
              Total Students
            </h4>
            <p className="text-slate-500">320 Students</p>
          </div>
        </div>

        {/* Total Instructors */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:shadow-2xl transition duration-300">
          <div className="bg-purple-100 text-purple-600 p-4 rounded-full text-2xl">
            <FaChalkboardTeacher />
          </div>
          <div>
            <h4 className="text-lg text-purple-600 font-semibold">
              Instructors
            </h4>
            <p className="text-slate-500">6 Instructors</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
