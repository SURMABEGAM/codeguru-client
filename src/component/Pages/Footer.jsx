import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Code<span className="text-indigo-500">Guru</span>
          </h2>
          <p className="mt-2 text-sm">
            Learn and grow with quality online courses.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex items-center">
          <p className="text-sm">© 2025 CodeGuru. All rights reserved.</p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 items-center">
          <a href="#" className="hover:text-white">
            Facebook
          </a>
          <a href="#" className="hover:text-white">
            LinkedIn
          </a>
          <a href="#" className="hover:text-white">
            X
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
