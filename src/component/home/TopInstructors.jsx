import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";

const TopInstructors = () => {
  const { t, isDark } = useApp();
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetch("/TopInstructors.json")
      .then((res) => res.json())
      .then((data) => setInstructors(data))
      .catch((err) => console.error(err));
  }, []);

  // Theme tokens
  const sectionBg = isDark ? "#0d0d1a" : "#f3f4f6";
  const cardBg = isDark ? "#1a1a2e" : "#ffffff";
  const cardHoverBg = isDark ? "#1e1b4b" : "#4f46e5";
  const nameColor = isDark ? "#e0e7ff" : "#111827";
  const metaColor = isDark ? "#9ca3af" : "#374151";
  const borderColor = isDark ? "#2d2d44" : "#e5e7eb";
  const headingColor = isDark ? "#e0e7ff" : "#4f46e5";
  const subColor = isDark ? "#6b7280" : "#9ca3af";
  const avatarBorder = isDark ? "#4338ca" : "#e5e7eb";
  const badgeBg = isDark ? "#1e1b4b" : "#eef2ff";
  const badgeColor = isDark ? "#a5b4fc" : "#4f46e5";

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        .instructor-card {
          font-family: 'Outfit', sans-serif;
          transition: background 0.3s, box-shadow 0.3s, transform 0.3s;
          cursor: pointer;
        }
        .instructor-card:hover .ins-name { color: white !important; }
        .instructor-card:hover .ins-meta { color: rgba(255,255,255,0.8) !important; }
        .instructor-card:hover .ins-badge { background: rgba(255,255,255,0.2) !important; color: white !important; }
        .instructor-card:hover .ins-avatar { border-color: rgba(255,255,255,0.6) !important; }
      `}</style>

      <section
        style={{
          padding: "72px 16px",
          background: sectionBg,
          transition: "background 0.3s",
          fontFamily: "Outfit, sans-serif",
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#6366f1",
              background: badgeBg,
              padding: "4px 14px",
              borderRadius: 20,
              marginBottom: 12,
            }}
          >
            Experts
          </span>
          <h2
            style={{
              margin: "0 0 10px",
              fontSize: "clamp(24px,4vw,36px)",
              fontWeight: 800,
              color: headingColor,
            }}
          >
            {t.topInstructors}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              color: subColor,
              maxWidth: 400,
              marginInline: "auto",
            }}
          >
            {t.topInstructorsSub}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {instructors.map((ins) => (
            <motion.div
              key={ins.id}
              variants={item}
              whileHover={{
                scale: 1.03,
                backgroundColor: cardHoverBg,
                boxShadow: "0 20px 50px rgba(99,102,241,0.3)",
              }}
              className="instructor-card"
              style={{
                background: cardBg,
                borderRadius: 20,
                padding: "32px 24px",
                border: `1px solid ${borderColor}`,
                boxShadow: isDark
                  ? "0 4px 20px rgba(0,0,0,0.3)"
                  : "0 4px 20px rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative" }}>
                <img
                  src={ins.image}
                  alt={ins.name}
                  className="ins-avatar"
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `3px solid ${avatarBorder}`,
                    transition: "border-color 0.3s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#10b981",
                    border: "2px solid white",
                  }}
                />
              </div>

              {/* Name */}
              <h3
                className="ins-name"
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 700,
                  color: nameColor,
                  textAlign: "center",
                  transition: "color 0.3s",
                }}
              >
                {ins.name}
              </h3>

              {/* Skills */}
              <p
                className="ins-meta"
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: metaColor,
                  textAlign: "center",
                  transition: "color 0.3s",
                }}
              >
                {ins.skills}
              </p>

              {/* Education */}
              <p
                className="ins-meta"
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: metaColor,
                  textAlign: "center",
                  transition: "color 0.3s",
                }}
              >
                {ins.education}
              </p>

              {/* Courses badge */}
              <span
                className="ins-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 14px",
                  borderRadius: 20,
                  background: badgeBg,
                  color: badgeColor,
                  fontSize: 12,
                  fontWeight: 700,
                  transition: "background 0.3s, color 0.3s",
                }}
              >
                📚 {ins.courses} {t.courses_label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default TopInstructors;
