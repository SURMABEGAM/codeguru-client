import React, { useContext, useEffect, useState } from "react";
import axiosPublic from "../../hooks/AxiosPublic";

import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2"; // ✅ FIX
import { Link, useNavigate } from "react-router";

const LatestCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledIds, setEnrolledIds] = useState([]);

  const { user } = useContext(AuthContext); // ✅ বাইরে আনো
  const navigate = useNavigate();

  // ✅ Correct useEffect
  useEffect(() => {
    axiosPublic
      .get("/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load courses", err);
        setLoading(false);
      });
  }, []);

  // ✅ loading UI
  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  const latestCourses = [...courses]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  // ✅ Enroll function
  const handleEnroll = async (courseId) => {
    if (!user?.email) {
      Swal.fire("Oops!", "Please login first to enroll!", "warning");
      navigate("/login");
      return;
    }

    try {
      const res = await axiosPublic.post("/enroll", {
        courseId,
        email: user.email,
      });

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Enrolled Successfully 🎉",
          timer: 1500,
          showConfirmButton: false,
        });

        setEnrolledIds((prev) => [...prev, courseId]);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        Swal.fire("Already Enrolled!", "You already enrolled.", "info");
        setEnrolledIds((prev) => [...prev, courseId]);
      } else {
        Swal.fire("Error!", "Enrollment failed!", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-10 text-center">Latest Courses</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestCourses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            {/* Image */}
            <img
              src={course.image}
              alt={course.title}
              className="h-44 w-full object-cover"
            />

            <div className="p-4">
              {/* Title */}
              <h3 className="text-lg font-bold text-indigo-700">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mt-2">
                {course.shortDescription ||
                  course.description?.slice(0, 100) + "..."}
              </p>

              {/* Info */}
              <div className="flex justify-between mt-3 text-sm">
                <span>⏱ {course.duration}</span>
                <span className="font-semibold text-indigo-600">
                  ৳ {course.price}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <Link
                  to={`/courses/${course._id}`}
                  className="flex-1 text-center border border-indigo-500 text-indigo-500 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition"
                >
                  Details
                </Link>

                <button
                  onClick={() => handleEnroll(course._id)}
                  disabled={enrolledIds.includes(course._id)}
                  className={`flex-1 py-2 rounded-lg text-white transition ${
                    enrolledIds.includes(course._id)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {enrolledIds.includes(course._id) ? "Enrolled" : "Enroll"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All Courses Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/courses")}
          className="bg-indigo-500 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition"
        >
          View All Courses
        </button>
      </div>
    </div>
  );
};

export default LatestCourses;
