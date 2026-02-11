import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axiosPublic from "../../hooks/AxiosPublic";

import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/courses/${id}`).then((res) => {
      console.log(res.data);
      const foundCourse = res.data;
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        Swal.fire("Error!", "Course not found!", "error");
        navigate("/courses");
      }
    });
  }, []);

  const handleEnroll = () => {
    if (!user) {
      Swal.fire("Oops!", "Please login first to enroll!", "warning");
      navigate("/login");
      return;
    }

    if (user.role && user.role !== "student") {
      Swal.fire("Oops!", "Only students can enroll in courses!", "error");
      return;
    }

    axiosPublic
      .post("/enroll", { courseId: id, email: user.email })
      .then(() => {
        Swal.fire("Success!", "You have enrolled in the course!", "success");
      })
      .catch(() => {
        Swal.fire("Error!", "Something went wrong!", "error");
      });
  };

  if (!course) return <p className="p-6">Loading course...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={course.image}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <p className="font-semibold">Price: ${course.price || "Free"}</p>
      <button onClick={handleEnroll} className="btn btn-primary mt-4">
        Enroll Now
      </button>
    </div>
  );
};

export default CourseDetails;
