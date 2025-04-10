'use client';
import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Dashboard } from "@/components/Dashboard/Dashboard";
import { Team } from "@/components/Team/Team";
import { Settings } from "@/components/Settings/Settings";
import { LoginPage } from "@/components/Auth/Login";
import { TopBar } from "@/components/Dashboard/TopBar";
import { staffData } from "@/components/Data/staffData"; // adjust path as needed

export default function Home() {
  const [selectedRoute, setSelectedRoute] = useState("dashboard");
  const [user, setUser] = useState<any | null>(null); // 💡 Track logged in user

  const handleLogin = (loggedInUser: any) => {
    setUser(loggedInUser); // Now you can pass the user data
  };

  const handleRouteChange = (route: string) => {
    setSelectedRoute(route);
  };

  // Show login if no user
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <Sidebar onRouteChange={handleRouteChange} selectedRoute={selectedRoute} user={user} />

      <div>
        <TopBar user={user} /> {/* 🔼 Pass logged-in user */}
        {selectedRoute === "dashboard" && <Dashboard />}
        {selectedRoute === "team" && <Team />}
        {selectedRoute === "settings" && <Settings user={user} onSave={handleLogin} />}
      </div>
    </main>
  );
}
