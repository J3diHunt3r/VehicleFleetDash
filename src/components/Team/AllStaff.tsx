'use client';
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiMoreHorizontal } from "react-icons/fi";
import { DeleteConfirmModal } from "../Modals/DeleteConfirmUserModal"; // Import the modal
import { staffData } from "../Data/staffData"; // Import staff data

export const AllStaff = () => {
  const [staffMembers, setStaffMembers] = useState(staffData);
  const [selectedStaff, setSelectedStaff] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<any | null>(null); // State for the staff to delete

  const openEditModal = (staff: any) => {
    setSelectedStaff(staff);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const deleteStaff = (staffId: string) => {
    setStaffMembers(prev => prev.filter(s => s.id !== staffId));
  };

  const handleSave = (staff: any) => {
    if (isEditing) {
      setStaffMembers(prev =>
        prev.map(s => (s.id === staff.id ? staff : s))
      );
    } else {
      setStaffMembers(prev => [
        ...prev,
        { ...staff, id: `ST${Math.floor(Math.random() * 10000)}` },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (staffToDelete) {
      deleteStaff(staffToDelete.id); // Use the correct id here for deletion
      setStaffToDelete(null); // Close the delete modal
    }
  };

  const handleCancelDelete = () => {
    setStaffToDelete(null); // Close the delete modal without action
  };

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          Staff Members
        </h3>
        <button
          className="text-sm text-violet-500 hover:underline"
          onClick={() => {
            setSelectedStaff(null);
            setIsEditing(false);
            setIsModalOpen(true);
          }}
        >
          Add Staff
        </button>
      </div>

      <table className="w-full table-auto">
        <StaffTableHead />
        <tbody>
          {staffMembers.map((staff, index) => (
            <StaffTableRow
              key={staff.id}
              staff={staff}
              order={index + 1}
              onEdit={() => openEditModal(staff)}
              onDelete={() => setStaffToDelete(staff)} // Set staff for deletion
            />
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <StaffModal
          isEditing={isEditing}
          staff={selectedStaff}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {staffToDelete && (
        <DeleteConfirmModal
          staff={staffToDelete} // Pass staffToDelete here
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

const StaffTableHead = () => (
  <thead>
    <tr className="text-sm font-normal text-stone-500">
      <th className="text-start p-1.5">Name</th>
      <th className="text-start p-1.5">Surname</th>
      <th className="text-start p-1.5">Role</th>
      <th className="text-start p-1.5">Email</th>
      <th className="text-start p-1.5">Mobile</th>
      <th className="w-8"></th>
    </tr>
  </thead>
);

const StaffTableRow = ({ staff, order, onEdit, onDelete }: { staff: any; order: number; onEdit: () => void; onDelete: () => void; }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">{staff.name}</td>
      <td className="p-1.5">{staff.surname}</td>
      <td className="p-1.5">{staff.role}</td>
      <td className="p-1.5">{staff.email}</td>
      <td className="p-1.5">{staff.mobile}</td>
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

const StaffModal = ({ isEditing, staff, onClose, onSave }: { isEditing: boolean; staff: any; onClose: () => void; onSave: (staff: any) => void; }) => {
  const [form, setForm] = useState(staff || {
    name: "",
    surname: "",
    role: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.surname || !form.role || !form.email) {
      alert("Please complete all required fields.");
      return;
    }
    onSave({ ...form, id: staff?.id || "" });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Staff" : "Add New Staff"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="First Name"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="surname"
            value={form.surname}
            onChange={handleChange}
            placeholder="Surname"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role"
            className="border rounded p-2"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
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
            {isEditing ? "Save Changes" : "Add Staff"}
          </button>
        </div>
      </div>
    </div>
  );
};
