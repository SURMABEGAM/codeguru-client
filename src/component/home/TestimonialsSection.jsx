import { useEffect, useState } from "react";
import axiosPublic from "../../hooks/AxiosPublic";

const fallback = [
  {
    name: "Tanvir Ahmed",
    course: "Web Dev Bootcamp",
    rating: 5,
    text: "I went from zero to landing a junior dev job in 4 months. The projects were exactly what employers wanted to see.",
    initials: "TA",
  },
  {
    name: "Meherun Nesa",
    course: "Python for ML",
    rating: 5,
    text: "The ML course is incredibly practical. My instructor responded to every question within hours. Worth every taka.",
    initials: "MN",
  },
  {
    name: "Sabbir Hasan",
    course: "UI/UX with Figma",
    rating: 4,
    text: "Great content and a very supportive community. The certificate helped me get a freelance client immediately.",
    initials: "SH",
  },
];

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState(fallback);

  useEffect(() => {
    axiosPublic
      .get("/testimonials")
      .then((r) => {
        if (r.data?.length) setReviews(r.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-2">
            Student reviews
          </p>
          <h2 className="text-3xl font-bold text-slate-800">
            What our students say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span
                    key={j}
                    className={
                      j < r.rating ? "text-amber-400" : "text-slate-200"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed italic mb-5">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold flex-shrink-0">
                  {r.initials || r.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {r.name}
                  </p>
                  <p className="text-xs text-slate-400">{r.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
