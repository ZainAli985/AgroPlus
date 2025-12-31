import React, { useState } from "react";

export default function NewYearSplash({ onFinish }) {
  const [showHidden, setShowHidden] = useState(false);

  const handleClose = () => {
    if (onFinish) onFinish();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative text-center px-6 max-w-2xl bg-transparent animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 bg-white text-black w-10 h-10 rounded-full font-bold text-xl shadow-lg hover:bg-gray-200 transition"
          aria-label="Close"
        >
          ✕
        </button>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-wide">
          🎉 Happy New Year 2026 🎉
        </h1>

        <p className="text-gray-300 text-lg mb-10">
          A new year filled with purpose, growth, and limitless potential.
        </p>

        {/* Hidden Message Box */}
        <div
          onClick={() => setShowHidden(!showHidden)}
          className="cursor-pointer mx-auto bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl p-6 shadow-xl hover:scale-105 transition duration-300"
        >
          <h3 className="text-xl font-bold mb-2">
            Click here for a special message ✨
          </h3>

          {showHidden && (
            <div className="mt-4 text-gray-200 text-left text-sm leading-relaxed">
              <p className="font-semibold mb-2">
                🌟 Blessings & Motivation for 2026
              </p>

              <p>
                May this year bring you clarity in your decisions, strength in
                your challenges, and consistency in your efforts.
                <br /><br />
                May your work be blessed, your intentions be pure, and your
                dedication open doors you once thought were impossible.
                <br /><br />
                Stay focused, stay grateful, and stay disciplined — success
                follows those who combine effort with patience.
                <br /><br />
                Wishing you health, growth, high achievements, and lasting
                success in everything you build this year. 🤍
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
