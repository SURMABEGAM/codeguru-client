import { useState } from "react";
import axiosPublic from "../../hooks/AxiosPublic";
import Swal from "sweetalert2";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axiosPublic.post("/newsletter", { email });
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "We'll keep you updated.",
        timer: 1500,
        showConfirmButton: false,
      });
      setEmail("");
    } catch {
      Swal.fire("Oops!", "Something went wrong. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-12">
          <p className="text-indigo-500 text-xs font-semibold uppercase tracking-widest mb-3">
            Stay updated
          </p>
          <h2 className="text-3xl font-bold text-indigo-900 mb-3">
            Stay in the loop
          </h2>
          <p className="text-indigo-600 text-sm mb-8">
            New courses, special offers, and learning tips — straight to your
            inbox. No spam.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl border border-indigo-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition disabled:opacity-60"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </form>
          <p className="text-xs text-indigo-400 mt-4">Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
