import React from "react";
import { FiCalendar } from "react-icons/fi";

export const TopBar = ({ user }: { user: any }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-bold">
            🚘 Good morning, {user?.name || "Guest"}!
          </span>
          <span className="text-xs text-stone-500">{today}</span>
        </div>

        {/* Right side */}
        <button className="flex items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded text-sm">
          <FiCalendar />
          <span>Date range</span>
        </button>
      </div>
    </div>
  );
};
