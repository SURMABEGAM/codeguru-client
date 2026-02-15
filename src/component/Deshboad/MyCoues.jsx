import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import axiosPublic from "../../hooks/AxiosPublic";
import { AuthContext } from "../context/AuthContext";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCourses = async () => {
    try {
      setLoading(true);
      // user email diye filter
      const res = await axiosPublic.get(`/courses/my?email=${user.email}`);
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load courses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) loadCourses();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This course will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/courses/${id}`);
          Swal.fire("Deleted!", "Course removed.", "success");
          loadCourses();
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to delete course.", "error");
        }
      }
    });
  };

  const handleUpdate = async (course) => {
    try {
      await axiosPublic.patch(`/courses/${course._id}`, {
        title: course.title + " (Updated)",
      });
      Swal.fire("Updated!", "Course updated successfully", "success");
      loadCourses();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update course.", "error");
    }
  };

  if (loading)
    return <p className="text-center mt-4">Loading your courses...</p>;

  if (courses.length === 0)
    return (
      <p className="text-center mt-4">You have not added any courses yet.</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Courses ({courses.length})</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-4 bg-white rounded shadow flex flex-col"
          >
            <img
              src={course.image}
              className="h-40 w-full object-cover rounded"
              alt={course.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
            <h3 className="font-semibold mt-2">{course.title}</h3>
            <p>Status: {course.status}</p>
            <p>Price: ${course.price}</p>

            <div className="flex gap-2 mt-auto pt-2">
              <button
                onClick={() => handleUpdate(course)}
                className="btn btn-sm btn-info flex-1"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="btn btn-sm btn-error flex-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
