import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axiosPublic from "../../hooks/AxiosPublic";
import Loader from "../home/Loader";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUserGraduate,
} from "react-icons/fa";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get(`/courses/${id}`)
      .then((res) => {
        const foundCourse = res.data;

        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          Swal.fire("Error!", "Course not found!", "error");
          navigate("/courses");
        }
      })
      .catch((error) => {
        console.log(error);

        Swal.fire("Error!", "Failed to load course!", "error");
      });
  }, [id, navigate]);

  const handleEnroll = () => {
    if (!user) {
      Swal.fire("Oops!", "Please login first to enroll!", "warning");

      navigate("/login");

      return;
    }

    axiosPublic
      .post("/enroll", {
        courseId: id,
        email: user.email,
      })
      .then(() => {
        Swal.fire("Success!", "You have enrolled in the course!", "success");
      })
      .catch(() => {
        Swal.fire("Error!", "Already enrolled!", "error");
      });
  };

  if (!course) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl mt-20 overflow-hidden">
        {/* IMAGE SECTION */}
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-[350px] object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {course.title}
            </h1>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">
          {/* SHORT DESCRIPTION */}
          <div className="mb-6">
            <p className="text-gray-600 text-lg leading-8">
              {course.description}
            </p>
          </div>

          {/* PRICE CARD */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white/80 text-sm mb-2">Course Price</p>

              <h2 className="text-5xl font-bold text-white">
                ${course.price || "Free"}
              </h2>
            </div>

            <button
              onClick={handleEnroll}
              className="bg-white text-indigo-700 hover:bg-indigo-100 transition duration-300 px-8 py-4 rounded-2xl text-lg font-bold shadow-lg"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
