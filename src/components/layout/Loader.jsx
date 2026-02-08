import React from "react";

/**
 * Universal full-screen loader using the site logo.
 * Use with LoaderContext: setLoading(true) / setLoading(false) from anywhere.
 */
const Loader = ({ show = true, message }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm"
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="loader-pulse flex items-center justify-center">
        <img
          src="/logo.png"
          alt=""
          className="loader-spin h-20 w-20 object-contain sm:h-24 sm:w-24"
          width={96}
          height={96}
        />
      </div>
      {message && (
        <p className="mt-4 text-sm font-medium text-gray-600">{message}</p>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  );
};

export default Loader;
