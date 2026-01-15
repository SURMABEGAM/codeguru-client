import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { axiosPublic } from "../../hooks/AxiosPublic";

const MyCoues = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const res = await axiosPublic.get("/courses/my");
    setCourses(res.data);
  };

  useEffect(() => {
    (async () => {
      await loadCourses();
    })();
  }, []);

  //  DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This course will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/courses/${id}`).then(() => {
          Swal.fire("Deleted!", "Course removed.", "success");
          loadCourses();
        });
      }
    });
  };

  //  UPDATE (simple demo)
  const handleUpdate = (course) => {
    axiosPublic
      .patch(`/courses/${course._id}`, {
        title: course.title + " (Updated)",
      })
      .then(() => {
        Swal.fire("Updated!", "Course updated successfully", "success");
        loadCourses();
      });
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Courses ({courses.length})</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="p-4 bg-white rounded shadow">
            <img
              src={course.image}
              className="h-40 w-full object-cover"
              alt=""
            />
            <h3 className="font-semibold mt-2">{course.title}</h3>
            <p>Status: {course.status}</p>
            <p>Price: ${course.price}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleUpdate(course)}
                className="btn btn-sm btn-info"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(course._id)}
                className="btn btn-sm btn-error"
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

export default MyCoues;
