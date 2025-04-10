'use client';
import React, { useState } from "react";
import { FiArrowUpRight, FiMoreHorizontal, FiTruck, FiEdit, FiTrash2 } from "react-icons/fi";
import { DeleteConfirmModal } from "../Modals/DeleteConfirmModal"; // Import the modal
import {vehicleData} from "../Data/vehicleData"

export const RecentTransactions = () => {
  const [vehicles, setVehicles] = useState(vehicleData);
  const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<any | null>(null); // State for the vehicle to delete

  const openEditModal = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const deleteVehicle = (vehicleId: string) => {
    setVehicles(prev => prev.filter(v => v.vehicleId !== vehicleId));
  };

  const handleSave = (vehicle: any) => {
    if (isEditing) {
      setVehicles(prev =>
        prev.map(v => (v.vehicleId === vehicle.vehicleId ? vehicle : v))
      );
    } else {
      setVehicles(prev => [
        ...prev,
        { ...vehicle, vehicleId: `VH${Math.floor(Math.random() * 10000)}` },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (vehicleToDelete) {
      deleteVehicle(vehicleToDelete.vehicleId);
      setVehicleToDelete(null); // Close the delete modal
    }
  };

  const handleCancelDelete = () => {
    setVehicleToDelete(null); // Close the delete modal without action
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiTruck /> Fleet Overview
        </h3>
        <button
          className="text-sm text-violet-500 hover:underline"
          onClick={() => {
            setSelectedVehicle(null);
            setIsEditing(false);
            setIsModalOpen(true);
          }}
        >
          Add Vehicle
        </button>
      </div>

      <table className="w-full table-auto">
        <FleetTableHead />
        <tbody>
          {vehicles.map((vehicle, index) => (
            <FleetTableRow
              key={vehicle.vehicleId}
              vehicle={vehicle}
              order={index + 1}
              onEdit={() => openEditModal(vehicle)}
              onDelete={() => setVehicleToDelete(vehicle)} // Set vehicle for deletion
            />
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <VehicleModal
          isEditing={isEditing}
          vehicle={selectedVehicle}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {vehicleToDelete && (
        <DeleteConfirmModal
          vehicle={vehicleToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

const FleetTableHead = () => (
  <thead>
    <tr className="text-sm font-normal text-stone-500">
      <th className="text-start p-1.5">Vehicle ID</th>
      <th className="text-start p-1.5">Rego</th>
      <th className="text-start p-1.5">Make</th>
      <th className="text-start p-1.5">Model</th>
      <th className="text-start p-1.5">Year</th>
      <th className="text-start p-1.5">Next Rego Due</th>
      <th className="text-start p-1.5">Renter</th>
      <th className="text-start p-1.5">Licence No</th>
      <th className="text-start p-1.5">Licence Expiry</th>
      <th className="text-start p-1.5">Rental Expiry</th> {/* New column */}
      <th className="text-start p-1.5">Next Service</th>
      <th className="w-8"></th>
    </tr>
  </thead>
);

const FleetTableRow = ({ vehicle, order, onEdit, onDelete }: { vehicle: any; order: number; onEdit: () => void; onDelete: () => void; }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">{vehicle.vehicleId}</td>
      <td className="p-1.5">{vehicle.rego}</td>
      <td className="p-1.5">{vehicle.make}</td>
      <td className="p-1.5">{vehicle.model}</td>
      <td className="p-1.5">{vehicle.year}</td>
      <td className="p-1.5">{vehicle.nextRegoDue}</td>
      <td className="p-1.5">{vehicle.renterName}</td>
      <td className="p-1.5">{vehicle.licenceNumber}</td>
      <td className="p-1.5">{vehicle.licenceExpiry}</td>
      <td className="p-1.5">{vehicle.rentalExpiry}</td> {/* New rentalExpiry field */}
      <td className="p-1.5">{vehicle.nextService}</td>
      <td className="relative w-8 text-right">
        <button
          className="hover:bg-stone-200 rounded size-8 grid place-content-center"
          onClick={() => setShowMenu(!showMenu)}
        >
          <FiMoreHorizontal />
        </button>

        {showMenu && (
          <div className="absolute right-0 z-10 mt-1 w-32 bg-white shadow border text-sm rounded">
            <button
              className="w-full px-3 py-2 text-left hover:bg-stone-100 flex items-center gap-1"
              onClick={() => {
                setShowMenu(false);
                onEdit();
              }}
            >
              <FiEdit /> Edit
            </button>
            <button
              className="w-full px-3 py-2 text-left hover:bg-stone-100 flex items-center gap-1 text-red-600"
              onClick={() => {
                setShowMenu(false);
                onDelete();
              }}
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

const VehicleModal = ({ isEditing, vehicle, onClose, onSave }: { isEditing: boolean; vehicle: any; onClose: () => void; onSave: (vehicle: any) => void; }) => {
  const [form, setForm] = useState(vehicle || {
    rego: "",
    make: "",
    model: "",
    year: "",
    nextRegoDue: "",
    renterName: "",
    licenceNumber: "",
    licenceExpiry: "",
    rentalExpiry: "", // New field
    nextService: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.rego || !form.make || !form.model || !form.year) {
      alert("Please complete all required fields.");
      return;
    }
    onSave({ ...form, vehicleId: vehicle?.vehicleId || "" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Vehicle" : "Add New Vehicle"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="rego"
            value={form.rego}
            onChange={handleChange}
            placeholder="Registration Plate"
            disabled={isEditing}
            className="border rounded p-2"
          />
          <input
            type="text"
            name="make"
            value={form.make}
            onChange={handleChange}
            placeholder="Make"
            disabled={isEditing}
            className="border rounded p-2"
          />
          <input
            type="text"
            name="model"
            value={form.model}
            onChange={handleChange}
            placeholder="Model"
            disabled={isEditing}
            className="border rounded p-2"
          />
          <input
            type="text"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Year"
            disabled={isEditing}
            className="border rounded p-2"
          />
          <input
            type="date"
            name="nextRegoDue"
            value={form.nextRegoDue}
            onChange={handleChange}
            className="border rounded p-2"
          />
          <input
            type="text"
            name="renterName"
            value={form.renterName}
            onChange={handleChange}
            placeholder="Renter Name"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="licenceNumber"
            value={form.licenceNumber}
            onChange={handleChange}
            placeholder="Licence Number"
            className="border rounded p-2"
          />
          <input
            type="date"
            name="licenceExpiry"
            value={form.licenceExpiry}
            onChange={handleChange}
            className="border rounded p-2"
          />
          <input
            type="date"
            name="rentalExpiry"
            value={form.rentalExpiry}
            onChange={handleChange}
            className="border rounded p-2"
          />
          <input
            type="date"
            name="nextService"
            value={form.nextService}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 border rounded hover:bg-stone-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
            onClick={handleSubmit}
          >
            {isEditing ? "Save Changes" : "Add Vehicle"}
          </button>
        </div>
      </div>
    </div>
  );
};
