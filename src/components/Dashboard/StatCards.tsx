'use client';
import React, { useState } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { vehicleData } from "../Data/vehicleData";

// Helper to check date range
const isDateInRange = (date: string, rangeInDays: number) => {
  const today = new Date();
  const targetDate = new Date(date);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);
  return diffDays <= rangeInDays && diffDays >= 0;
};

const handleNotify = (vehicle) => {
  // Your logic to notify the user, like showing an alert or sending a notification
  alert(`Notifying user for vehicle: ${vehicle.rego}`);
};


export const StatCards = () => {
  const vehiclesDueForRego = vehicleData.filter(v => isDateInRange(v.nextRegoDue, 14));
  const vehiclesDueForService = vehicleData.filter(v => isDateInRange(v.nextService, 30));
  const vehiclesRentalExpiring = vehicleData.filter(v => isDateInRange(v.rentalExpiry, 30));

  return (
    <>
      <Card
        title="Vehicles Due for Registration"
        value={vehiclesDueForRego.length.toString()}
        pillText={`${((vehiclesDueForRego.length / vehicleData.length) * 100).toFixed(2)}%`}
        trend={vehiclesDueForRego.length > 0 ? "up" : "down"}
        period="Next 2 weeks"
        vehicles={vehiclesDueForRego}
      />
      <Card
        title="Vehicles Due for Service"
        value={vehiclesDueForService.length.toString()}
        pillText={`${((vehiclesDueForService.length / vehicleData.length) * 100).toFixed(2)}%`}
        trend={vehiclesDueForService.length > 0 ? "up" : "down"}
        period="Next 30 days"
        vehicles={vehiclesDueForService}
      />
      <Card
        title="Vehicles with Rental Expiring"
        value={vehiclesRentalExpiring.length.toString()}
        pillText={`${((vehiclesRentalExpiring.length / vehicleData.length) * 100).toFixed(2)}%`}
        trend={vehiclesRentalExpiring.length > 0 ? "up" : "down"}
        period="Next 30 days"
        vehicles={vehiclesRentalExpiring}
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
  vehicles,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
  vehicles?: any[];
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="col-span-4 p-4 rounded border border-stone-300 relative">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500 mb-4">{period}</p>

      {vehicles && vehicles.length > 0 && (
        <button
          onClick={() => setShowModal(true)}
          className="absolute bottom-4 right-4 text-xs text-violet-600 hover:underline"
        >
          View Vehicles
        </button>
      )}

      {showModal && vehicles && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] w-full max-w-xl overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <ul className="space-y-2 text-sm">
              {vehicles.map((vehicle, idx) => (
                <li key={idx} className="border-b pb-2 flex justify-between items-center">
                  <div>
                    <strong>{vehicle.rego}</strong> – {vehicle.make} {vehicle.model} ({vehicle.year})<br />
                    <span className="text-stone-500 text-xs">
                      Renter: {vehicle.renterName}
                    </span>
                  </div>
                  <button
                    onClick={() => handleNotify(vehicle)} // Handle the button click
                    className="bg-green-400 text-white px-4 py-2 text-xs rounded hover:bg-violet-700"
                  >
                    Notify User
                  </button>
                </li>

              ))}
            </ul>

            <div className="mt-4 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 text-sm bg-violet-600 text-white rounded hover:bg-violet-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
