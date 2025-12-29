import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../Pages/Buttom";

const HomeCard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/coures.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
      {courses.map((course) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden"
        >
          <div className="overflow-hidden rounded-lg">
            <img
              src={course.image}
              className="w-full h-48 object-cover rounded-lg group-hover:scale-110 transition duration-500"
            />
          </div>

          <h2 className="text-xl font-bold mt-4 text-black">{course.title}</h2>

          <p className="text-gray-600 my-3">{course.description}</p>

          <div className="justify-center items-center">
            <Button />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HomeCard;
