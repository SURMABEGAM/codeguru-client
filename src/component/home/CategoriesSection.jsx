import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosPublic from "../../hooks/AxiosPublic";

const fallbackCats = [
  { name: "Web Development", icon: "💻", count: 28 },
  { name: "Data Science", icon: "📊", count: 19 },
  { name: "UI/UX Design", icon: "🎨", count: 14 },
  { name: "DevOps & Cloud", icon: "☁️", count: 11 },
  { name: "Mobile Dev", icon: "📱", count: 9 },
  { name: "Cybersecurity", icon: "🔐", count: 8 },
  { name: "Business", icon: "🤝", count: 16 },
  { name: "Soft Skills", icon: "🧩", count: 12 },
];

const CategoriesSection = () => {
  const [cats, setCats] = useState(fallbackCats);
  const navigate = useNavigate();

  useEffect(() => {
    axiosPublic
      .get("/categories")
      .then((r) => {
        if (r.data?.length) setCats(r.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-2">
            Browse by topic
          </p>
          <h2 className="text-3xl font-bold text-slate-800">
            Find your category
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {cats.map((c) => (
            <button
              key={c.name}
              onClick={() =>
                navigate(`/courses?category=${encodeURIComponent(c.name)}`)
              }
              className="group flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50/40 transition-all duration-200"
            >
              <span className="text-3xl">{c.icon}</span>
              <span className="text-xs font-semibold text-slate-700 text-center leading-tight group-hover:text-indigo-700">
                {c.name}
              </span>
              <span className="text-[10px] text-slate-400">
                {c.count} courses
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
