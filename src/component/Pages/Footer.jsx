import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";

import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="relative bg-[#0B1120] text-gray-300 overflow-hidden border-t border-white/10">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {/* TOP CTA */}
        <div className="mb-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              Ready to grow your
              <span className="text-indigo-500"> development career?</span>
            </h2>

            <p className="mt-4 text-gray-400 max-w-2xl">
              Learn modern web development with real-world projects, mentorship,
              and career-focused training.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-500 outline-none w-full lg:w-[280px]"
            />

            <button className="px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-semibold text-white shadow-lg shadow-indigo-500/20">
              Get Started
            </button>
          </div>
        </div>

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold text-white">
              Code<span className="text-indigo-500">Guru</span>
            </h1>

            <p className="mt-5 text-gray-400 leading-7 max-w-md">
              CodeGuru is a modern learning platform helping students become
              job-ready developers through practical coding, live mentorship,
              and premium learning resources.
            </p>

            {/* CONTACT */}
            <div className="mt-6 flex items-center gap-3 text-gray-400">
              <MdEmail className="text-indigo-500 text-xl" />
              support@codeguru.dev
            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.facebook.com/profile.php?id=61563925216002"
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300 flex items-center justify-center"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.linkedin.com/in/surma-begam-tisha/"
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-sky-500 hover:border-sky-500 transition-all duration-300 flex items-center justify-center"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-gray-700 hover:border-gray-700 transition-all duration-300 flex items-center justify-center"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-600 transition-all duration-300 flex items-center justify-center"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Product</h3>

            <ul className="space-y-4 text-sm">
              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Features
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Courses
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Pricing
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Updates
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Company</h3>

            <ul className="space-y-4 text-sm">
              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  About
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Careers
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Blog
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6">Resources</h3>

            <ul className="space-y-4 text-sm">
              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Documentation
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Help Center
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="/" className="hover:text-indigo-400 transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-sm text-gray-500">
            © 2026 CodeGuru. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="/" className="hover:text-indigo-400 transition">
              Privacy
            </a>

            <a href="/" className="hover:text-indigo-400 transition">
              Terms
            </a>

            <a href="/" className="hover:text-indigo-400 transition">
              Security
            </a>
          </div>

          {/* Scroll Top */}
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center shadow-lg shadow-indigo-500/20"
          >
            <FaArrowUp className="text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
