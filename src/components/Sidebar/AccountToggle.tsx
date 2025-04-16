import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative w-full">
        <img
          src="/sawari_logo.jpg"
          alt="avatar"
          className="w-full h-auto rounded bg-violet-500 shadow object-contain"
        />
      </button>
    </div>
  );
};
