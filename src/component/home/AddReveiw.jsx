import { useState } from "react";
import axiosPublic from "../../hooks/AxiosPublic";
import { useApp } from "../../context/AppContext";
import { HiOutlinePencilAlt, HiOutlineCheckCircle } from "react-icons/hi";

const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4, margin: "4px 0" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            fontSize: 28,
            color: star <= (hovered || value) ? "#f59e0b" : "#d1d5db",
            transition: "color 0.15s, transform 0.15s",
            transform: star <= (hovered || value) ? "scale(1.15)" : "scale(1)",
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const AddReview = () => {
  const { t, isDark } = useApp();
  const [form, setForm] = useState({
    name: "",
    course: "",
    rating: 5,
    text: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Theme tokens
  const bg = isDark ? "#1a1a2e" : "#ffffff";
  const cardBg = isDark ? "#0f0f19" : "#f8f8ff";
  const border = isDark ? "#2d2d44" : "#e5e7eb";
  const labelColor = isDark ? "#a5b4fc" : "#4f46e5";
  const inputBg = isDark ? "#1e1e2e" : "#f9fafb";
  const inputBorder = isDark ? "#374151" : "#e5e7eb";
  const inputColor = isDark ? "#e5e7eb" : "#1f2937";
  const headingColor = isDark ? "#e0e7ff" : "#1e1b4b";
  const subColor = isDark ? "#9ca3af" : "#6b7280";

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 12,
    border: `1.5px solid ${inputBorder}`,
    background: inputBg,
    color: inputColor,
    fontSize: 14,
    fontFamily: "Outfit, sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#6366f1";
    e.target.style.boxShadow = "0 0 0 4px rgba(99,102,241,0.10)";
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = inputBorder;
    e.target.style.boxShadow = "none";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reviewData = {
      ...form,
      initials: form.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase(),
      createdAt: new Date(),
    };

    try {
      await axiosPublic.post("/testimonials", reviewData);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", course: "", rating: 5, text: "" });
      }, 2500);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${border}`,
        borderRadius: 20,
        padding: "28px 24px",
        maxWidth: 480,
        margin: "0 auto",
        fontFamily: "Outfit, sans-serif",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HiOutlinePencilAlt size={20} color="white" />
        </div>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: headingColor,
            }}
          >
            {t.addReview}
          </h3>
          <p style={{ margin: 0, fontSize: 12, color: subColor }}>
            Share your learning experience
          </p>
        </div>
      </div>

      {/* Success state */}
      {submitted ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "32px 0",
            gap: 12,
          }}
        >
          <HiOutlineCheckCircle size={52} color="#10b981" />
          <p
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 700,
              color: headingColor,
            }}
          >
            {t.reviewSuccess}
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Name */}
          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: labelColor,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              {t.yourName}
            </label>
            <input
              type="text"
              required
              style={inputStyle}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="e.g. Rahim Uddin"
            />
          </div>

          {/* Course */}
          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: labelColor,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              {t.courseName}
            </label>
            <input
              type="text"
              required
              style={inputStyle}
              value={form.course}
              onChange={(e) => setForm({ ...form, course: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="e.g. React Fundamentals"
            />
          </div>

          {/* Rating */}
          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: labelColor,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 4,
              }}
            >
              Rating
            </label>
            <StarRating
              value={form.rating}
              onChange={(v) => setForm({ ...form, rating: v })}
            />
          </div>

          {/* Review text */}
          <div>
            <label
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: labelColor,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: 6,
              }}
            >
              Review
            </label>
            <textarea
              required
              rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={t.writeReview}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: 12,
              border: "none",
              background: loading
                ? "#9ca3af"
                : "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color: "white",
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "Outfit, sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 14px rgba(99,102,241,0.3)",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {loading ? (
              <span
                style={{
                  display: "inline-block",
                  width: 18,
                  height: 18,
                  border: "2.5px solid rgba(255,255,255,0.4)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
            ) : (
              <>{t.submitReview}</>
            )}
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </form>
      )}
    </div>
  );
};

export default AddReview;
