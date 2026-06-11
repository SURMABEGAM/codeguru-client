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
    <footer className="relative overflow-hidden border-t border-base-300 bg-base-100 text-base-content">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {/* TOP CTA */}
        <div className="mb-16 rounded-3xl border border-base-300 bg-base-200/50 backdrop-blur-xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-base-content leading-tight">
              Ready to grow your
              <span className="text-indigo-500"> development career?</span>
            </h2>

            <p className="mt-4 text-base-content/70 max-w-2xl">
              Learn modern web development with real-world projects, mentorship,
              and career-focused training.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-4 rounded-xl bg-base-100 border border-base-300 text-base-content placeholder:text-base-content/50 outline-none w-full lg:w-[280px]"
            />

            <button className="px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-semibold text-white shadow-lg">
              Get Started
            </button>
          </div>
        </div>

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold text-base-content">
              Code<span className="text-indigo-500">Guru</span>
            </h1>

            <p className="mt-5 text-base-content/70 leading-7 max-w-md">
              CodeGuru is a modern learning platform helping students become
              job-ready developers through practical coding, live mentorship,
              and premium learning resources.
            </p>

            <div className="mt-6 flex items-center gap-3 text-base-content/70">
              <MdEmail className="text-indigo-500 text-xl" />
              support@codeguru.dev
            </div>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-8">
              <a
                href="https://www.facebook.com/profile.php?id=61563925216002"
                className="w-11 h-11 rounded-xl bg-base-200 border border-base-300 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.linkedin.com/in/surma-begam-tisha/"
                className="w-11 h-11 rounded-xl bg-base-200 border border-base-300 hover:bg-sky-500 hover:border-sky-500 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-base-200 border border-base-300 hover:bg-gray-700 hover:border-gray-700 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-xl bg-base-200 border border-base-300 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-base-content text-lg font-semibold mb-6">
              Product
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Courses
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Updates
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-base-content text-lg font-semibold mb-6">
              Company
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-base-content text-lg font-semibold mb-6">
              Resources
            </h3>

            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Documentation
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="text-base-content/70 hover:text-indigo-500 transition"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 pt-6 border-t border-base-300 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-sm text-base-content/60">
            © 2026 CodeGuru. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-base-content/60">
            <a href="/" className="hover:text-indigo-500 transition">
              Privacy
            </a>

            <a href="/" className="hover:text-indigo-500 transition">
              Terms
            </a>

            <a href="/" className="hover:text-indigo-500 transition">
              Security
            </a>
          </div>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center shadow-lg"
          >
            <FaArrowUp className="text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
