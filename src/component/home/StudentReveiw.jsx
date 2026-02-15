import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const StudentReview = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/studentreview.json")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error(err));
  }, []);

  // Framer Motion variants for rows
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3 } },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  // Split into rows of 3
  const rows = [];
  for (let i = 0; i < reviews.length; i += 3) {
    rows.push(reviews.slice(i, i + 3));
  }

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold  text-fuchsia-400 text-center mb-10">
        Student Reviews
      </h2>

      <div className="space-y-8 max-w-6xl mx-auto">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {row.map((rev, idx) => (
              <motion.div
                key={idx}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden"
              >
                {/* Decorative circles */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>

                <img
                  src={rev.image}
                  alt={rev.name}
                  className="w-24 h-24 rounded-full border-4 border-white mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-center">{rev.name}</h3>
                <p className="text-center text-sm mb-4 opacity-80">
                  {rev.course}
                </p>
                <p className="text-center italic mb-4">"{rev.review}"</p>
                <div className="flex justify-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < rev.rating ? "text-yellow-400" : "text-white/50"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StudentReview;
