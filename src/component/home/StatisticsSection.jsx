import { useEffect, useRef, useState } from "react";
import axiosPublic from "../../hooks/AxiosPublic";
import { FiUsers, FiBook, FiAward, FiStar } from "react-icons/fi";

const useCountUp = (target, active) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const step = target / 60;
    const t = setInterval(() => {
      v = Math.min(v + step, target);
      setVal(Math.round(v));
      if (v >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [target, active]);
  return val;
};

const StatCard = ({ icon: Icon, label, target, suffix = "+" }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const value = useCountUp(target, active);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setActive(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white border border-slate-100 rounded-2xl p-6 text-center"
    >
      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
        <Icon size={20} />
      </div>
      <p className="text-3xl font-bold text-slate-900 mb-1">
        {value.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
};

const StatisticsSection = () => {
  const [data, setData] = useState({
    users: 5200,
    courses: 120,
    instructors: 48,
    satisfaction: 98,
  });

  useEffect(() => {
    axiosPublic
      .get("/stats")
      .then((r) => setData(r.data))
      .catch(() => {});
  }, []);

  const cards = [
    {
      icon: FiUsers,
      label: "Students enrolled",
      target: data.users,
      suffix: "+",
    },
    {
      icon: FiBook,
      label: "Courses published",
      target: data.courses,
      suffix: "+",
    },
    {
      icon: FiAward,
      label: "Expert instructors",
      target: data.instructors,
      suffix: "+",
    },
    {
      icon: FiStar,
      label: "Satisfaction rate",
      target: data.satisfaction,
      suffix: "%",
    },
  ];

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-2">
            By the numbers
          </p>
          <h2 className="text-3xl font-bold text-slate-800">
            Our platform at a glance
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
