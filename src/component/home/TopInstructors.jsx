import React, { useEffect, useState } from "react";
import axiosPublic from "../../hooks/AxiosPublic";

const TopInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/instructors")
      .then((res) => res.data)
      .then((data) => {
        setInstructors(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-gray-100 dark:bg-slate-900">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {instructors.map((ins) => (
          <div
            key={ins._id}
            className="
      group
      relative
      overflow-hidden
      rounded-3xl
      bg-white dark:bg-slate-800
      border border-gray-200 dark:border-slate-700
      p-6
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all duration-500
    "
          >
            {/* Top Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>

            {/* Avatar */}
            <div className="flex flex-col items-center text-center relative z-10">
              <img
                src={ins.instructor?.photo}
                alt={ins.instructor?.name}
                className="
          w-24 h-24
          rounded-full
          object-cover
          border-4 border-indigo-100
          shadow-lg
        "
              />

              <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">
                {ins.instructor?.name}
              </h3>

              <p className="text-indigo-500 font-medium">Senior Instructor</p>

              <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 line-clamp-3">
                {ins.instructor?.bio}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
              <div className="bg-indigo-50 dark:bg-slate-700 rounded-xl p-3 text-center">
                <h4 className="text-lg font-bold text-indigo-600">
                  {ins.totalCourses}
                </h4>
                <p className="text-xs text-gray-500">Courses</p>
              </div>

              <div className="bg-indigo-50 dark:bg-slate-700 rounded-xl p-3 text-center">
                <h4 className="text-lg font-bold text-indigo-600">⭐ 4.9</h4>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopInstructors;
