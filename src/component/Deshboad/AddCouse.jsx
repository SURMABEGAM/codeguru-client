import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosPublic from "../../hooks/AxiosPublic";
import Swal from "sweetalert2";

const AddCouse = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const courseData = {
      title: form.title.value,
      description: form.description.value,
      price: form.price.value,
      image: form.image.value,
      instructorEmail: user.email,
      status: "pending",
    };

    try {
      const res = await axiosPublic.post("/courses", courseData);

      if (res.data.insertedId) {
        Swal.fire("Success!", "Course added successfully", "success");
        form.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Course Title"
          className="input input-bordered w-full"
          required
        />

        <input
          name="image"
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>

        <button className="btn btn-primary w-full">Add Course</button>
      </form>
    </div>
  );
};

export default AddCouse;
