// src/components/Settings/Settings.tsx
import React, { useState } from "react";

// Interface for User Data
interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

interface SettingsPageProps {
  user: User;
  onSave: (updatedUser: User) => void; // Function to handle saving the updated user details
}

export const Settings = ({ user, onSave }: SettingsPageProps) => {
  const [editedUser, setEditedUser] = useState(user); // Maintain local state for the edited user

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedUser); // Call the onSave function passed via props
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-stone-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-lg">
        <h2 className="text-xl font-bold mb-6 text-center">Settings</h2>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={editedUser.avatarUrl}
              alt="User Avatar"
              className="w-16 h-16 rounded-full"
            />
            <input
              type="file"
              className="px-4 py-2 border border-stone-300 rounded"
              onChange={(e) => {
                // Handle avatar upload logic here if needed
                alert("Avatar upload is not yet implemented");
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleSave}
              className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-6 rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => alert("Settings reset logic goes here")}
              className="bg-stone-200 hover:bg-stone-300 text-stone-700 py-2 px-6 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
