import React, { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { FiVideo, FiUsers, FiBook, FiUserCheck } from "react-icons/fi";

const Counter = ({ value }) => {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 5,
      ease: "easeOut",
    });

    return controls.stop;
  }, [value]);

  return (
    <motion.h2 className="text-3xl font-bold">
      <motion.span>{rounded}</motion.span>+
    </motion.h2>
  );
};

const Download = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/download.json")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const iconMap = {
    book: <FiBook className="w-10 h-10 text-yellow-400" />,
    users: <FiUsers className="w-10 h-10 text-yellow-400" />,
    video: <FiVideo className="w-10 h-10 text-yellow-400" />,
    userCheck: <FiUserCheck className="w-10 h-10 text-yellow-400" />,
  };

  if (loading) {
    return (
      <div className="text-center text-white py-20 animate-pulse">
        Loading statistics...
      </div>
    );
  }

  return (
    <section className="w-full px-4 md:px-10 -mt-20 z-50 relative mb-48">
      <div className="bg-[#080748] rounded-3xl shadow-2xl py-12 px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.2 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl
                         hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,0.4)]"
            >
              <div className="p-4 bg-white/10 rounded-full">
                {iconMap[item.icon]}
              </div>
              ✅ {/* Animated Counter */}
              <Counter value={item.number} />
              <p className="text-gray-200">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Download;
