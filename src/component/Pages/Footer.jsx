import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaArrowUp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const bg = "#ffffff";
  const border = "#e5e7eb";
  const cardBg = "#f9fafb";
  const headingColor = "#1f2937";
  const subColor = "#6b7280";
  const inputBg = "#ffffff";
  const inputBorder = "#e5e7eb";
  const inputColor = "#1f2937";

  return (
    <footer
      className="relative overflow-hidden border-t"
      style={{
        backgroundColor: bg,
        borderColor: border,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        {/* CTA */}
        <div
          className="mb-16 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{
            backgroundColor: cardBg,
            border: `1px solid ${border}`,
          }}
        >
          <div>
            <h2
              className="text-3xl lg:text-4xl font-bold"
              style={{ color: headingColor }}
            >
              Ready to grow your
              <span className="text-indigo-500"> development career?</span>
            </h2>

            <p className="mt-4 max-w-2xl" style={{ color: subColor }}>
              Learn modern web development with real-world projects, mentorship,
              and career-focused training.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-5 py-4 rounded-xl outline-none"
              style={{
                backgroundColor: inputBg,
                border: `1px solid ${inputBorder}`,
                color: inputColor,
              }}
            />

            <button className="px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition">
              Get Started
            </button>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h1
              className="text-3xl font-extrabold"
              style={{ color: headingColor }}
            >
              Code<span className="text-indigo-500">Guru</span>
            </h1>

            <p className="mt-5 leading-7 max-w-md" style={{ color: subColor }}>
              CodeGuru is a modern learning platform helping students become
              job-ready developers through practical coding, live mentorship and
              premium learning resources.
            </p>

            <div
              className="mt-6 flex items-center gap-3"
              style={{ color: subColor }}
            >
              <MdEmail className="text-indigo-500 text-xl" />
              support@codeguru.dev
            </div>

            <div className="flex gap-4 mt-8">
              {[FaFacebookF, FaLinkedinIn, FaGithub, FaYoutube].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition hover:bg-indigo-600 hover:text-white"
                    style={{
                      backgroundColor: cardBg,
                      border: `1px solid ${border}`,
                      color: inputColor,
                    }}
                  >
                    <Icon />
                  </div>
                ),
              )}
            </div>
          </div>

          {["Product", "Company", "Resources"].map((section) => (
            <div key={section}>
              <h3
                className="text-lg font-semibold mb-6"
                style={{ color: headingColor }}
              >
                {section}
              </h3>

              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="/"
                    className="hover:text-indigo-500 transition"
                    style={{ color: subColor }}
                  >
                    Sample Link
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-indigo-500 transition"
                    style={{ color: subColor }}
                  >
                    Sample Link
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="hover:text-indigo-500 transition"
                    style={{ color: subColor }}
                  >
                    Sample Link
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="mt-16 pt-6 flex flex-col md:flex-row items-center justify-between gap-5"
          style={{
            borderTop: `1px solid ${border}`,
          }}
        >
          <p className="text-sm" style={{ color: subColor }}>
            © 2026 CodeGuru. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm" style={{ color: subColor }}>
            <a href="/">Privacy</a>
            <a href="/">Terms</a>
            <a href="/">Security</a>
          </div>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
