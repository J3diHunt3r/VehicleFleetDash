import React from "react";

export const DeleteConfirmModal = ({
  vehicle,
  onConfirm,
  onCancel,
}: {
  vehicle: any;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-sm text-stone-700">
          Are you sure you want to delete the vehicle <strong>{vehicle.rego}</strong>?<br />
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 border border-stone-300 rounded hover:bg-stone-100"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
