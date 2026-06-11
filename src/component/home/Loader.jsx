import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* glass card */}
      <div
        className="relative flex flex-col items-center justify-center px-10 py-8 rounded-2xl 
                  bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl"
      >
        {/* animated glow ring */}
        <div className="absolute inset-0 rounded-2xl animate-pulse bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 opacity-30 blur-2xl" />

        {/* spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-purple-500 border-b-transparent border-l-transparent animate-spin"></div>
        </div>

        {/* text */}
        <p className="mt-5 text-slate-700 text-base md:text-lg font-semibold tracking-wide">
          Loading your experience...
        </p>

        {/* small animated dots */}
        <div className="flex gap-1 mt-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
