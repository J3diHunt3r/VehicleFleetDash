// src/components/Auth/ForgotPasswordModal.tsx

'use client';
import React, { useState } from "react";

interface ForgotPasswordModalProps {
  onClose: () => void;
  onSend: (email: string) => void;
}

export const ForgotPasswordModal = ({ onClose, onSend }: ForgotPasswordModalProps) => {
  const [resetEmail, setResetEmail] = useState("");

  const handleSend = () => {
    onSend(resetEmail);
    setResetEmail("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-3">Reset Password</h3>
        <p className="text-sm text-stone-600 mb-2">
          Enter your email to receive a password reset link:
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          className="w-full border border-stone-300 rounded px-3 py-2 mb-4 text-sm"
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-stone-300 rounded hover:bg-stone-100 text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 text-sm"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
