import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axiosPublic from "../../hooks/AxiosPublic";
import Loader from "../home/Loader";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get(`/courses/${id}`)
      .then((res) => {
        if (res.data) setCourse(res.data);
        else {
          Swal.fire("Error!", "Course not found!", "error");
          navigate("/courses");
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to load course!", "error");
        navigate("/courses");
      });
  }, [id, navigate]);

  const handleEnroll = async () => {
    if (!user) {
      Swal.fire("Oops!", "Please login first to enroll!", "warning");
      navigate("/login");
      return;
    }
    try {
      await axiosPublic.post("/enroll", { courseId: id, email: user.email });
      Swal.fire({
        icon: "success",
        title: "Enrolled Successfully 🎉",
        timer: 1500,
        showConfirmButton: false,
      });
      setEnrolled(true);
      navigate("/dashboard/my-courses");
    } catch (err) {
      if (err.response?.status === 400) {
        Swal.fire(
          "Already Enrolled!",
          "You already enrolled in this course.",
          "info",
        );
        setEnrolled(true);
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

  const discount =
    course?.originalPrice > course?.price
      ? Math.round((1 - course.price / course.originalPrice) * 100)
      : 0;

  if (!course) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto mt-16 bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        {/* Hero */}
        <div className="relative h-72">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {course.category && (
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-indigo-100/20 text-indigo-100 backdrop-blur-sm border border-indigo-200/30">
                  {course.category}
                </span>
              )}
              {course.isFeatured && (
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-amber-400/90 text-amber-900">
                  Featured
                </span>
              )}
              {course.level && (
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30">
                  {course.level}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
            {/* Left */}
            <div>
              <p className="text-gray-600 leading-relaxed mb-8">
                {course.description}
              </p>

              {/* Outcomes */}
              {course.outcomes?.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                    What you'll learn
                  </h2>
                  <ul className="space-y-2">
                    {course.outcomes.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Prerequisites */}
              {course.prerequisites?.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                    Prerequisites
                  </h2>
                  <ul className="space-y-2">
                    {course.prerequisites.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-slate-500"
                      >
                        <span className="text-slate-300 mt-0.5 flex-shrink-0">
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tags */}
              {course.tags?.length > 0 && (
                <section>
                  <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                    Topics covered
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right — Enroll Card */}
            <aside>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sticky top-6">
                {/* Price */}
                <div className="mb-1">
                  {course.price === 0 ? (
                    <span className="text-3xl font-bold text-emerald-600">
                      Free
                    </span>
                  ) : (
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-3xl font-bold text-slate-900">
                        ৳{course.price?.toLocaleString()}
                      </span>
                      {course.originalPrice > course.price && (
                        <span className="text-sm text-slate-400 line-through">
                          ৳{course.originalPrice?.toLocaleString()}
                        </span>
                      )}
                    </div>
                  )}
                  {discount > 0 && (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {discount}% off
                    </span>
                  )}
                </div>

                <button
                  onClick={handleEnroll}
                  disabled={enrolled}
                  className={`w-full py-3 rounded-xl font-semibold text-sm mt-4 mb-2 transition ${
                    enrolled
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                  }`}
                >
                  {enrolled ? "Already enrolled" : "Enroll now"}
                </button>
                <p className="text-center text-[11px] text-slate-400 mb-5">
                  30-day money-back guarantee
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { label: "Lessons", value: course.totalLessons },
                    { label: "Duration", value: course.duration },
                    { label: "Rating", value: `★ ${course.rating}` },
                    {
                      label: "Students",
                      value: course.totalEnrolled?.toLocaleString() ?? "—",
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-white border border-slate-100 rounded-xl p-3 text-center"
                    >
                      <p className="text-base font-semibold text-slate-800">
                        {value}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Instructor */}
                {course.instructor?.name && (
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-3">
                      Instructor
                    </p>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold flex-shrink-0">
                        {getInitials(course.instructor.name)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {course.instructor.name}
                        </p>
                        {course.instructor.title && (
                          <p className="text-xs text-slate-400">
                            {course.instructor.title}
                          </p>
                        )}
                      </div>
                    </div>
                    {course.instructor.bio && (
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {course.instructor.bio}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
