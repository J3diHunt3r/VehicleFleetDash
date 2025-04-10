"use client";

import React from "react";
import { FiTruck } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { vehicleData } from "../data/vehicleData"; // Your vehicle data

// Format: { name: "Apr 2025", Registration: 2, Service: 3, Rental: 1 }
const processData = () => {
  const monthlyStats: Record<string, any> = {};

  vehicleData.forEach((v) => {
    const regoMonth = new Date(v.nextRegoDue).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const serviceMonth = new Date(v.nextService).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const rentalMonth = new Date(v.rentalExpiry).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyStats[regoMonth]) monthlyStats[regoMonth] = { name: regoMonth, Registration: 0, Service: 0, Rental: 0 };
    if (!monthlyStats[serviceMonth]) monthlyStats[serviceMonth] = { name: serviceMonth, Registration: 0, Service: 0, Rental: 0 };
    if (!monthlyStats[rentalMonth]) monthlyStats[rentalMonth] = { name: rentalMonth, Registration: 0, Service: 0, Rental: 0 };

    monthlyStats[regoMonth].Registration += 1;
    monthlyStats[serviceMonth].Service += 1;
    monthlyStats[rentalMonth].Rental += 1;
  });

  // Convert to sorted array by date
  return Object.values(monthlyStats).sort((a: any, b: any) => {
    return new Date("1 " + a.name).getTime() - new Date("1 " + b.name).getTime();
  });
};

export const ActivityGraph = () => {
  const data = processData();

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiTruck /> Fleet Activity Trends
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 0, right: 0, left: -24, bottom: 0 }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis className="text-xs font-bold" axisLine={false} tickLine={false} />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line type="monotone" dataKey="Registration" stroke="#facc15" />
            <Line type="monotone" dataKey="Service" stroke="#2563eb" />
            <Line type="monotone" dataKey="Rental" stroke="#16a34a" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
