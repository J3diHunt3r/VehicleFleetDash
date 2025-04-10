"use client";
import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { vehicleData } from "../Data/vehicleData";
import { FiTruck } from "react-icons/fi";

// Group vehicle makes and count how many of each
const getVehicleMakeData = () => {
  const makeMap: Record<string, number> = {};

  vehicleData.forEach(vehicle => {
    if (makeMap[vehicle.make]) {
      makeMap[vehicle.make]++;
    } else {
      makeMap[vehicle.make] = 1;
    }
  });

  return Object.entries(makeMap).map(([make, count]) => ({
    name: make,
    value: count,
  }));
};

// Define some fun colors
const COLORS = [
  "#5b21b6", "#4ade80", "#facc15", "#f472b6", "#60a5fa",
  "#f87171", "#34d399", "#fbbf24", "#c084fc", "#3b82f6",
];

export const UsageRadar = () => {
  const data = getVehicleMakeData();

  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiTruck /> Vehicle Makes
        </h3>
      </div>

      <div className="h-72 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
