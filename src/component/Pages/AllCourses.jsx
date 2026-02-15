import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import axiosPublic from "../../hooks/AxiosPublic";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

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

  if (loading) return <p>Loading courses...</p>;

  const handleEnroll = async (courseId) => {
    if (!user?.email) {
      Swal.fire("Oops!", "Please login first to enroll!", "warning");
      navigate("/login");
      return;
    }

    try {
      const enrollData = {
        courseId,
        email: user.email,
      };

      const res = await axiosPublic.post("/enroll", enrollData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Enrolled Successfully 🎉",
          timer: 1500,
          showConfirmButton: false,
        });

        // instantly disable button
        setEnrolledIds((prev) => [...prev, courseId]);

        navigate("/dashboard/my-courses");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        Swal.fire(
          "Already Enrolled!",
          "You already enrolled in this course.",
          "info",
        );

        // button disable
        setEnrolledIds((prev) => [...prev, courseId]);
      } else {
        Swal.fire("Error!", "Enrollment failed!", "error");
      }
    }
  };

  return (
    <div className="grid md:grid-cols-3  gap-6 p-4 max-w-7xl mx-auto">
      {courses.map((course) => (
        <div
          key={course._id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
        >
          <img
            src={course.image}
            onError={(e) => {
              e.target.src =
                "https://cdn.pixabay.com/photo/2022/04/01/09/10/binary-7104409_1280.jpg";
            }}
            alt={course.title}
            className="h-44 w-full object-cover rounded-lg"
          />

          <h2 className="text-xl font-bold text-black mt-3">{course.title}</h2>

          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {course.description}
          </p>

          <p className="mt-2 font-semibold text-black">
            Price: {course.price ? course.price : "Free"}
          </p>

          <div className="mt-auto flex  text-black gap-2 pt-3">
            <Link
              to={`/courses/${course._id}`}
              className="btn btn-outline flex-1"
            >
              Details
            </Link>

            <button
              onClick={() => handleEnroll(course._id)}
              disabled={enrolledIds.includes(course._id)}
              className={`btn btn-primary flex-1 ${
                enrolledIds.includes(course._id) && "btn-disabled"
              }`}
            >
              {enrolledIds.includes(course._id) ? "Enrolled" : "Enroll"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCourses;
