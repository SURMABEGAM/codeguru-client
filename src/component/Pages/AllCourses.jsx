import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import axiosPublic from "../../hooks/AxiosPublic";
import Loader from "../home/Loader";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosPublic
      .get("/courses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user?.email) {
      Swal.fire("Oops!", "Please login first to enroll!", "warning");
      navigate("/login");
      return;
    }
    try {
      const res = await axiosPublic.post("/enroll", {
        courseId,
        email: user.email,
      });
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Enrolled Successfully 🎉",
          timer: 1500,
          showConfirmButton: false,
        });
        setEnrolledIds((prev) => [...prev, courseId]);
        navigate("/dashboard/my-courses");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        Swal.fire(
          "Already Enrolled!",
          "You already enrolled in this course.",
          "info",
        );
        setEnrolledIds((prev) => [...prev, courseId]);
      } else {
        Swal.fire("Error!", "Enrollment failed!", "error");
      }
    }
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const getDiscount = (price, original) =>
    original > price ? Math.round((1 - price / original) * 100) : 0;

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-3 text-slate-800">
        Explore Our Courses
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto text-sm leading-relaxed">
        উন্নত প্রযুক্তি শিখুন এবং ক্যারিয়ারের নতুন দিগন্ত উন্মোচন করুন। অভিজ্ঞ
        মেন্টরদের সাথে সরাসরি কাজ করার সুযোগ।
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => {
          const isEnrolled = enrolledIds.includes(course._id);
          const discount = getDiscount(course.price, course.originalPrice);

          return (
            <div
              key={course._id}
              className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden flex-shrink-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Top-left badge */}
                {course.isFeatured && (
                  <span className="absolute top-3 left-3 bg-amber-300 text-amber-900 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                )}
                {!course.isFeatured && course.isNew && (
                  <span className="absolute top-3 left-3 bg-emerald-200 text-emerald-900 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    New
                  </span>
                )}

                {/* Level badge */}
                <span className="absolute top-3 right-3 bg-white/90 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                  {course.level}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                {/* Instructor */}
                {course.instructor?.name && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-[9px] font-semibold flex-shrink-0">
                      {getInitials(course.instructor.name)}
                    </div>
                    <span className="text-xs text-slate-500">
                      {course.instructor.name}
                    </span>
                  </div>
                )}

                {/* Category + Rating */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {course.category}
                  </span>
                  <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                    ★ {course.rating}
                  </span>
                </div>

                <h2 className="text-sm font-semibold text-slate-800 leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h2>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-1.5 mb-4">
                  {[
                    { label: "Lessons", value: course.totalLessons },
                    { label: "Duration", value: course.duration },
                    {
                      label: "Students",
                      value: course.totalEnrolled?.toLocaleString() ?? "—",
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-slate-50 rounded-xl p-2 text-center"
                    >
                      <p className="text-[9px] text-slate-400 uppercase tracking-wide mb-0.5">
                        {label}
                      </p>
                      <p className="text-xs font-semibold text-slate-700">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    {course.price === 0 ? (
                      <span className="text-base font-bold text-emerald-600">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-lg font-bold text-slate-900">
                          ৳{course.price.toLocaleString()}
                        </span>
                        {course.originalPrice > course.price && (
                          <span className="text-xs text-slate-400 line-through">
                            ৳{course.originalPrice.toLocaleString()}
                          </span>
                        )}
                        {discount > 0 && (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            {discount}% off
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn btn-xs btn-ghost rounded-lg text-slate-500"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleEnroll(course._id)}
                      disabled={isEnrolled}
                      className={`btn btn-xs rounded-lg px-4 font-semibold transition ${
                        isEnrolled
                          ? "btn-disabled bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white border-none"
                      }`}
                    >
                      {isEnrolled ? "Enrolled" : "Enroll now"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCourses;
