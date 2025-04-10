// Sidebar.tsx

import React from "react";
import { AccountToggle } from "./AccountToggle";
import { Search } from "./Search";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";

interface SidebarProps {
  onRouteChange: (route: string) => void; // onRouteChange function passed as a prop
  selectedRoute: string; // The selected route
}

export const Sidebar = ({ onRouteChange,selectedRoute }: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        {/* Include AccountToggle and Search here */}
        <AccountToggle />
        <Search />

        {/* Pass onRouteChange to RouteSelect */}
        <RouteSelect onRouteChange={onRouteChange} selectedRoute={selectedRoute} />
      </div>

      {/* Plan Component */}
      <Plan />
    </div>
  );
};
