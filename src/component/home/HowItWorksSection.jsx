import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Browse & choose",
    desc: "Explore 120+ courses across 8 categories. Filter by level, price, or topic to find the perfect fit.",
    icon: "🔍",
  },
  {
    n: "02",
    title: "Enroll & learn",
    desc: "Get instant access to video lessons, quizzes, assignments, and downloadable resources.",
    icon: "📚",
  },
  {
    n: "03",
    title: "Earn your certificate",
    desc: "Complete the course, pass the final assessment, and download your industry-recognized certificate.",
    icon: "🏆",
  },
];

const HowItWorksSection = () => (
  <section className="py-20 px-4 bg-slate-50">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-2">
          How it works
        </p>
        <h2 className="text-3xl font-bold text-slate-800">
          Three steps to get started
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connector line — desktop only */}
        <div className="hidden md:block absolute top-10 left-[calc(33%-12px)] right-[calc(33%-12px)] h-px bg-indigo-100 z-0" />

        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative z-10 bg-white border border-slate-100 rounded-2xl p-8 text-center"
          >
            <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl">
              {s.icon}
            </div>
            <span className="text-xs font-semibold text-indigo-400 tracking-widest">
              {s.n}
            </span>
            <h3 className="text-lg font-bold text-slate-800 mt-1 mb-3">
              {s.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
