import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import axiosPublic from "../../hooks/AxiosPublic";
import { AuthContext } from "../context/AuthContext";
import useRole from "../../hooks/useRole";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useRole();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInstructor = role === "instructor";
  const isStudent = role === "student";

  const loadCourses = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      let res;
      if (isInstructor) {
        // Instructor sees own added courses
        res = await axiosPublic.get(`/courses/my?email=${user.email}`);
      } else if (isStudent) {
        // Student sees enrolled courses
        res = await axiosPublic.get(`/enrolled-courses/${user.email}`);
        // map enrolled courseIds to full course details
        const courseDetails = await Promise.all(
          res.data.map(async (enroll) => {
            const courseRes = await axiosPublic.get(
              `/courses/${enroll.courseId}`,
            );
            return courseRes.data;
          }),
        );
        res = { data: courseDetails };
      }
      setCourses(res.data || []);
    } catch (err) {
      console.error("Failed to load courses", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!roleLoading) loadCourses();
  }, [user, roleLoading, role]);

  const handleDelete = async (id) => {
    if (!isInstructor) return;
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This course will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
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
  };

  const handleUpdate = async (course) => {
    if (!isInstructor) return;
    const newTitle = prompt("Enter new title", course.title);
    if (!newTitle) return;
    try {
      await axiosPublic.patch(`/courses/${course._id}`, { title: newTitle });
      Swal.fire("Updated!", "Course updated successfully", "success");
      loadCourses();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update course.", "error");
    }
  };

  if (roleLoading || loading)
    return <p className="text-center mt-4">Loading courses...</p>;

  if (!courses.length)
    return <p className="text-center mt-4">No courses found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-slate-50 mt-10 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">
        {isInstructor ? "My Added Courses" : "My Enrolled Courses"}
        <span className="text-emerald-600"> ({courses.length})</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col"
          >
            <img
              src={course.image}
              className="h-44 w-full object-cover rounded-xl"
              alt={course.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=No+Image";
              }}
            />
            <h3 className="font-semibold text-lg text-indigo-700 mt-3">
              {course.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">{course.description}</p>
            {course.price && (
              <p className="text-sm text-slate-600 mt-1">
                Price:{" "}
                <span className="font-medium text-indigo-600">
                  ${course.price}
                </span>
              </p>
            )}
            {isInstructor && (
              <>
                <p className="text-sm text-slate-600">
                  Status:{" "}
                  <span className="font-medium text-emerald-600">
                    {course.status}
                  </span>
                </p>
                <div className="flex gap-3 mt-auto pt-4">
                  <button
                    onClick={() => handleUpdate(course)}
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
