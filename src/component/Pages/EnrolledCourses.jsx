import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosPublic from "../../hooks/AxiosPublic";

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/enroll?email=${user.email}`)
        .then((res) => setCourses(res.data))
        .catch(console.error);
    }
  }, [user]);

  if (!courses.length)
    return <p className="text-center mt-4">No enrolled courses yet.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course._id}
          className="p-5 bg-white rounded-xl shadow flex flex-col"
        >
          <img
            src={course.image}
            className="h-44 w-full object-cover rounded-lg"
          />
          <h3 className="font-semibold text-lg mt-3">{course.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EnrolledCourses;
