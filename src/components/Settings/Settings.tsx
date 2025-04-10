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
  onLogout: () => void; // Function to handle user logout
}

export const Settings = ({ user, onSave, onLogout }: SettingsPageProps) => {
  const [editedUser, setEditedUser] = useState(user); // Maintain local state for the edited user
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }

    // Reset password match error
    if (newPassword !== value) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleSave = () => {
    onSave(editedUser); // Call the onSave function passed via props
    alert("Settings saved successfully!");
  };

  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    // Handle password change logic (for example, calling an API to change password)
    alert("Password updated successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-100 p-6">
      <div className="bg-white p-8 rounded shadow w-full max-w-lg">
        <h2 className="text-xl font-bold mb-6 text-center">Settings</h2>

        <div className="space-y-6">
          {/* Avatar Upload */}
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

          {/* Name Input */}
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

          {/* Email Input */}
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

          {/* Password Change Section */}
          <div>
            <label className="block text-sm font-semibold">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handlePasswordChange}
              className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
            />
            {passwordError && <p className="text-red-500 text-xs mt-2">{passwordError}</p>}
          </div>

          {/* Save Changes and Reset Buttons */}
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

          {/* Password Save Button */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePasswordSave}
              className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-6 rounded"
            >
              Change Password
            </button>
          </div>

          {/* Logout Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
