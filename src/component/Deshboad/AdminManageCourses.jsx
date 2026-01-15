import React, { useEffect, useState } from "react";
import axiosPublic from "../../hooks/AxiosPublic";
import Swal from "sweetalert2";

const AdminManageCourses = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const res = await axiosPublic.get("/courses/pending");
    setCourses(res.data);
  };

  useEffect(() => {
    axiosPublic.get("/courses/pending").then((res) => {
      setCourses(res.data);
    });
  }, []);

  const handleApprove = (id) => {
    axiosPublic.patch(`/courses/approve/${id}`).then(() => {
      Swal.fire("Approved!", "Course approved", "success");
      loadCourses();
    });
  };

  const handleReject = (id) => {
    axiosPublic.patch(`/courses/reject/${id}`).then(() => {
      Swal.fire("Rejected!", "Course rejected", "error");
      loadCourses();
    });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Pending Courses ({courses.length})
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{course.title}</h3>
            <p>Instructor: {course.instructorEmail}</p>
            <p>Status: {course.status}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleApprove(course._id)}
                className="btn btn-success btn-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(course._id)}
                className="btn btn-error btn-sm"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminManageCourses;
