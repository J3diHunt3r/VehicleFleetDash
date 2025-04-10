// RouteSelect.tsx

import React from "react";
import { IconType } from "react-icons";
import { FiHome, FiUsers } from "react-icons/fi";

interface RouteSelectProps {
  onRouteChange: (route: string) => void; // Function to change the route
  selectedRoute: string; // The selected route
}

export const RouteSelect = ({ onRouteChange, selectedRoute }: RouteSelectProps) => {
  return (
    <div className="space-y-1">
      <Route
        Icon={FiHome}
        title="Dashboard"
        selected={selectedRoute === "dashboard"} // Check if this route is selected
        onClick={() => onRouteChange("dashboard")}
      />
      <Route
        Icon={FiUsers}
        title="Team"
        selected={selectedRoute === "team"} // Check if this route is selected
        onClick={() => onRouteChange("team")}
      />
    </div>
  );
};

// Route Component for individual Sidebar items
interface RouteProps {
  Icon: IconType;
  title: string;
  selected: boolean; // New prop to check if the route is selected
  onClick: () => void;
}

const Route = ({ Icon, title, selected, onClick }: RouteProps) => {
  return (
    <button
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-violet-500 text-white shadow-md" // Apply styles when selected
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
      onClick={onClick}
    >
      <Icon className={selected ? "text-white" : ""} /> {/* Change icon color when selected */}
      <span>{title}</span>
    </button>
  );
};
