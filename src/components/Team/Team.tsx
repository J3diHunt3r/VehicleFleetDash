import React from "react";
import { TopBar } from "./TopBar";
import { TeamGrid } from "./TeamGrid";

export const Team = () => {
  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <TeamGrid />
    </div>
  );
};
