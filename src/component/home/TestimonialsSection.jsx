import { useState } from "react";
import axiosPublic from "../../hooks/AxiosPublic";

const AddReview = () => {
  const [form, setForm] = useState({
    name: "",
    course: "",
    rating: 5,
    text: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      ...form,
      initials: form.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase(),
      createdAt: new Date(),
    };

    try {
      await axiosPublic.post("/testimonials", reviewData);

      alert("Review Added!");

      setForm({
        name: "",
        course: "",
        rating: 5,
        text: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        className="input input-bordered w-full"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="text"
        placeholder="Course Name"
        className="input input-bordered w-full"
        value={form.course}
        onChange={(e) => setForm({ ...form, course: e.target.value })}
      />

      <textarea
        placeholder="Write Review"
        className="textarea textarea-bordered w-full"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />

      <button className="btn btn-primary">Submit Review</button>
    </form>
  );
};

export default AddReview;
