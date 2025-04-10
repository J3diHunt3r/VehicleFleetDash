import React, { useState } from "react";

export const VehicleModal = ({
  isEditing,
  vehicle,
  onClose,
  onSave,
}: {
  isEditing: boolean;
  vehicle: any;
  onClose: () => void;
  onSave: (vehicle: any) => void;
}) => {
  const [form, setForm] = useState(
    vehicle || {
      rego: "",
      make: "",
      model: "",
      year: "",
      nextRegoDue: "",
      renterName: "",
      licenceNumber: "",
      licenceExpiry: "",
      rentalExpiry: "",  // Added rentalExpiry field here
      nextService: "",
    }
  );

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
        <h2 className="text-lg font-semibold mb-6">
          {isEditing ? "Edit Vehicle" : "Add New Vehicle"}
        </h2>

        <form className="grid grid-cols-2 gap-4">
          {[
            { name: "rego", label: "Registration Plate", type: "text", disabled: isEditing },
            { name: "make", label: "Make", type: "text", disabled: isEditing },
            { name: "model", label: "Model", type: "text", disabled: isEditing },
            { name: "year", label: "Year", type: "text", disabled: isEditing },
            { name: "nextRegoDue", label: "Next Rego Due", type: "date" },
            { name: "renterName", label: "Renter Name", type: "text" },
            { name: "licenceNumber", label: "Licence Number", type: "text" },
            { name: "licenceExpiry", label: "Licence Expiry", type: "date" },
            { name: "rentalExpiry", label: "Rental Expiry", type: "date" },  // Added the rentalExpiry field here
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label htmlFor={field.name} className="text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                disabled={field.disabled}
                className="border border-stone-300 rounded p-2"
              />
            </div>
          ))}

          {/* Full width row for nextService */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="nextService" className="text-sm font-medium mb-1">
              Next Service Date
            </label>
            <input
              id="nextService"
              type="date"
              name="nextService"
              value={form.nextService}
              onChange={handleChange}
              className="border border-stone-300 rounded p-2"
            />
          </div>
        </form>

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
