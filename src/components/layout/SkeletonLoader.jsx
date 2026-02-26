import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="flex h-screen w-screen animate-pulse bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-4 flex flex-col gap-4">
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-gray-200 px-6 flex items-center gap-4">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-16 bg-gray-300 rounded ml-auto"></div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 flex flex-col gap-4">
          {/* Simulate multiple rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 rounded w-full"></div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default SkeletonLoader;