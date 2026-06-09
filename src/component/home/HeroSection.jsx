import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import axiosPublic from "../../hooks/AxiosPublic";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=1200&q=80",
    heading: "Build Skills That Shape Your Future",
    sub: "Expert-led courses in tech, design, and business — learn at your own pace.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
    heading: "From Beginner to Job-Ready",
    sub: "Practical projects and real-world curriculum trusted by top employers.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80",
    heading: "Learn From Bangladesh's Best Mentors",
    sub: "48+ expert instructors with industry experience, available 24/7.",
  },
];

const HeroSection = () => {
  const [idx, setIdx] = useState(0);
  const [stats, setStats] = useState({
    users: 5200,
    courses: 120,
    instructors: 48,
  });
  const timer = useRef(null);

  useEffect(() => {
    axiosPublic
      .get("/stats")
      .then((r) => setStats(r.data))
      .catch(() => {});
    timer.current = setInterval(
      () => setIdx((i) => (i + 1) % slides.length),
      4000,
    );
    return () => clearInterval(timer.current);
  }, []);

  return (
    <section className="relative min-h-[65vh] flex items-center overflow-hidden bg-[#26215C]">
      {/* Background image carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={slides[idx].image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#26215C]/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <motion.p
          key={`eyebrow-${idx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#AFA9EC] text-xs font-semibold uppercase tracking-widest mb-4"
        >
          Bangladesh's #1 Online Learning Platform
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.h1
            key={`h-${idx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl mb-6"
          >
            {slides[idx].heading}
          </motion.h1>
        </AnimatePresence>

        <motion.p
          key={`sub-${idx}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-[#CECBF6] text-lg max-w-xl leading-relaxed mb-8"
        >
          {slides[idx].sub}
        </motion.p>

        {/* Dynamic hero stats */}
        <div className="flex flex-wrap gap-8 mb-10">
          {[
            {
              value: `${stats.users?.toLocaleString()}+`,
              label: "students enrolled",
            },
            { value: `${stats.courses}+`, label: "courses available" },
            { value: `${stats.instructors}+`, label: "expert instructors" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-[#AFA9EC]">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/courses"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition"
          >
            Explore courses
          </Link>
          <Link
            to="/about"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-semibold transition"
          >
            Watch demo
          </Link>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? "w-6 bg-[#AFA9EC]" : "w-1.5 bg-white/30"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
