import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const TopInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    fetch("/TopInstructors.json")
      .then((res) => res.json())
      .then((data) => setInstructors(data))
      .catch((err) => console.error(err));
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-indigo-600 text-center mb-10">
        Our Top Instructors
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {instructors.map((ins) => (
          <motion.div
            key={ins.id}
            variants={item}
            className="bg-white p-6 rounded-xl shadow-lg hover:bg-indigo-600 hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <img
              src={ins.image}
              alt={ins.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-4 border-gray-200 hover:border-white transition duration-300"
            />
            <h3 className="text-lg font-semibold text-center text-black mb-2">
              {ins.name}
            </h3>
            <p className="text-center  text-black font-medium">
              Courses: {ins.courses}
            </p>
            <p className="text-center text-gray-600 font-medium">
              {ins.skills}
            </p>
            <p className="text-center text-gray-600 font-medium">
              {ins.education}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TopInstructors;
