// Home.tsx

'use client';
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar"; // Sidebar Component
import { Dashboard } from "@/components/Dashboard/Dashboard"; // Dashboard Component
import { Team } from "@/components/Team/Team"; // Team Component

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState<string>("dashboard");

  // This function is passed down to Sidebar
  const handleRouteChange = (route: string) => {
    setSelectedRoute(route); // Update the selected route
  };

  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      {/* Pass selectedRoute to Sidebar */}
      <Sidebar onRouteChange={handleRouteChange} selectedRoute={selectedRoute} />

      {/* Conditional Rendering based on selectedRoute */}
      <div className="content-area">
        {selectedRoute === "dashboard" && <Dashboard />}
        {selectedRoute === "team" && <Team />}
      </div>
    </main>
  );
}
