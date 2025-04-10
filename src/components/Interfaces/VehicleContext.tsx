// src/contexts/VehicleContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

// Define the Vehicle interface
interface Vehicle {
  vehicleId: string;
  rego: string;
  make: string;
  model: string;
  year: string;
  nextRegoDue: string;
  renterName: string;
  licenceNumber: string;
  licenceExpiry: string;
  nextService: string;
  rentalExpiry: string;
}

// Create the context
interface VehicleContextType {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (vehicle: Vehicle) => void;
  deleteVehicle: (vehicleId: string) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider: React.FC = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const addVehicle = (vehicle: Vehicle) => setVehicles((prev) => [...prev, vehicle]);
  const updateVehicle = (updatedVehicle: Vehicle) => {
    setVehicles((prev) => prev.map((vehicle) => (vehicle.vehicleId === updatedVehicle.vehicleId ? updatedVehicle : vehicle)));
  };
  const deleteVehicle = (vehicleId: string) => setVehicles((prev) => prev.filter((vehicle) => vehicle.vehicleId !== vehicleId));

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle, updateVehicle, deleteVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = (): VehicleContextType => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error("useVehicles must be used within a VehicleProvider");
  }
  return context;
};
