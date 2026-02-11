import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import axiosPublic from "../../hooks/AxiosPublic";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const Navigate = useNavigate;

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

  //  useEffect(() => {
  //   if (user?.email) {
  //     axiosPublic.get(`/enrolled-courses/${user.email}`).then((res) => {
  //      setEnrolledIds(res.data.map((item) => item.courseId));
  //   });
  //   }
  // }, [user]);

  // ✅ 3. Enroll handler (FINAL)
  const handleEnroll = async (courseId) => {
    if (!user?.email) {
      return Swal.fire("Please login first");
    }

    const enrollData = {
      courseId,
      email: user.email,
    };

    try {
      const res = await axiosPublic.post("/enroll", enrollData);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Enrolled Successfully 🎉",
        });

        // instantly disable button
        setEnrolledIds((prev) => [...prev, courseId]);

        // 🔥 go to My Courses
        Navigate("/dashboard/my-courses");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Enroll failed");
    }
  };

  return (
    <div className="grid md:grid-cols-3  gap-6 p-4 max-w-7xl mx-auto">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
        >
          <img
            src={course.image}
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
              to={`/courses/${course.id}`}
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
