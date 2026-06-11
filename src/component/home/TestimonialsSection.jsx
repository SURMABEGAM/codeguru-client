import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axiosPublic from "../../hooks/AxiosPublic";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={30}
          className="cursor-pointer transition-all duration-200 hover:scale-125"
          color={(hover || rating) >= star ? "#facc15" : "#d1d5db"}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        />
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const { user } = useContext(AuthContext);

  const [review, setReview] = useState({
    text: "",
    rating: 5,
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-800">
            Please Login First
          </h2>
          <p className="text-slate-500 mt-2">
            You need to login to submit a review.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.text.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Review Required",
        text: "Please write your review.",
      });
    }

    const newReview = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      text: review.text,
      rating: review.rating,
      createdAt: new Date(),
    };

    try {
      setLoading(true);

      await axiosPublic.post("/testimonials", newReview);

      setReviews((prev) => [newReview, ...prev]);

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your review has been submitted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setReview({
        text: "",
        rating: 5,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Could not submit review. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <h2 className="text-2xl font-bold text-center">
              Leave Your Review
            </h2>
            <p className="text-center text-indigo-100 mt-1">
              Share your learning experience
            </p>
          </div>

          <div className="p-6">
            {/* User Info */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl mb-6">
              <img
                src={user?.photoURL || "https://i.ibb.co/2t6h6Yt/user.png"}
                alt="user"
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
              />

              <div>
                <h3 className="font-bold text-lg text-slate-800">
                  {user?.displayName || "Anonymous User"}
                </h3>

                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Review Text */}
              <textarea
                value={review.text}
                onChange={(e) =>
                  setReview({
                    ...review,
                    text: e.target.value,
                  })
                }
                placeholder="Tell us about your experience..."
                className="textarea textarea-bordered w-full h-32"
              />

              {/* Rating */}
              <div>
                <p className="text-center text-sm text-slate-500 mb-3">
                  Rate your experience
                </p>

                <StarRating
                  rating={review.rating}
                  setRating={(value) =>
                    setReview({
                      ...review,
                      rating: value,
                    })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </motion.div>

        {/* REVIEWS */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-10">
              Recent Reviews
            </h3>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={r.photoURL || "https://i.ibb.co/2t6h6Yt/user.png"}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h4 className="font-semibold">{r.name}</h4>

                      <p className="text-xs text-slate-500">{r.email}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-slate-600 leading-relaxed">
                    {r.text}
                  </p>

                  <div className="flex gap-1 mt-4">
                    {[...Array(r.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
