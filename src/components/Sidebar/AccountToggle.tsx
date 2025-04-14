import React from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const AccountToggle = () => {
  return (
    <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/pet-scouter.appspot.com/o/profile_images%2FN5mM5LujptafskdOWpM7uSv4i2Y2%2F1735404845767.png?alt=media&token=1973659b-ccb1-4daa-a770-ea126bee415c"
          alt="avatar"
          className="size-8 rounded shrink-0 bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-bold block">Company Logo goes here</span>
        </div>
      </button>
    </div>
  );
};
