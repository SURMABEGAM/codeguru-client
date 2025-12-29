import React from "react";
import { motion } from "framer-motion";
import { RxDividerVertical } from "react-icons/rx";
import { FiArrowRight } from "react-icons/fi";

const Baner = ({
  title = "CodeGuru",
  subtitle = "Build real projects and level up your skills",
  ctaText = "Get Started",
  ctaHref = "#",
  showBadge = true,
}) => {
  return (
    <section className="relative overflow-hidden rounded-b-3xl shadow-2xl mb-40">
      {/* Decorative background image */}
      <div
        className="absolute inset-0 bg-cover bg-center sm:opacity-100 opacity-70"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2023/10/30/21/14/ai-generated-8353869_1280.jpg')`,
        }}
      />

      {/* Gradient overlay to improve text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 lg:py-36">
        {showBadge && (
          <span className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm text-sm text-white rounded-full px-3 py-1 w-max">
            <RxDividerVertical className="w-4 h-4" />
            <strong className="font-semibold">CodeGuru</strong>
            <span className="opacity-80">Teacher-led</span>
          </span>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-white max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-lg sm:text-xl opacity-90">{subtitle}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-3 bg-white text-black font-semibold rounded-2xl px-5 py-3 shadow-lg hover:shadow-2xl focus:ring-4 focus:ring-white/30 focus:outline-none"
                aria-label={ctaText}
              >
                {ctaText}
                <FiArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#learn-more"
                className="inline-flex items-center gap-2 text-white/90 px-4 py-3 rounded-2xl border border-white/20 hover:bg-white/5 focus:outline-none"
              >
                Learn more
              </a>
            </div>

            {/* small features row (optional) */}
            <ul className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
              <li className="inline-flex items-center gap-2">
                ✅ Project-based
              </li>
              <li className="inline-flex items-center gap-2">
                ✅ Daily practice
              </li>
              <li className="inline-flex items-center gap-2">
                ✅ Friendly feedback
              </li>
            </ul>
          </motion.div>

          {/* Right: optional card/preview - hidden on very small screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="hidden md:flex justify-end"
          >
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/30 bg-white/6 backdrop-blur-sm">
              {/* If you prefer an <img> rather than background, swap this block. */}
              <img
                src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg"
                className="w-full h-56 object-cover"
                loading="lazy"
              />

              <div className="p-4">
                <h3 className="text-white font-semibold">
                  Live Project Preview
                </h3>
                <p className="mt-2 text-sm text-white/80">
                  Follow along and build this project step-by-step with guided
                  lessons.
                </p>
                <div className="mt-4 flex gap-3">
                  <a
                    href={ctaHref}
                    className="text-sm bg-white text-black px-3 py-2 rounded-full font-semibold"
                  >
                    Start
                  </a>
                  <a
                    href="#syllabus"
                    className="text-sm px-3 py-2 rounded-full border border-white/20"
                  >
                    Syllabus
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Baner;
