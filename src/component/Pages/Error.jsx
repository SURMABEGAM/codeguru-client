import React from "react";
import { Link } from "react-router";

const Fun404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-200 to-blue-200 p-4">
      <h1 className="text-8xl font-extrabold text-red-600 mb-4 animate-pulse">
        404
      </h1>

      {/* Fun image */}
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="Lost illustration"
        className="w-64 h-64 mb-6 animate-bounce"
      />

      <p className="text-2xl text-gray-800 mb-6 text-center">
        Oops! Looks like you’re lost in space.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Fun404;
