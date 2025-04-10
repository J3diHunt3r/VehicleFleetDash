'use client';
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ForgotPasswordModal } from "../Modals/ForgotPasswordModal";
import { staffData } from "../Data/staffData"; // ✅ Import staff data

export const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [error, setError] = useState<string | null>(null); // 🛑 For error messages

const handleLogin = () => {
  const foundUser = staffData.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    setError(null);
    onLogin(foundUser); // ✅ Pass the whole user object back
  } else {
    setError("Invalid email or password");
  }
};


  const handleSendResetEmail = (resetEmail: string) => {
    alert(`Password reset email sent to ${resetEmail}`);
    setShowForgotModal(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-stone-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-center">Login</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-stone-300 rounded px-3 py-2 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-violet-600 hover:underline"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded"
          >
            Sign In
          </button>

          <div className="flex items-center justify-center mt-4">
            <span className="text-xs text-stone-400">or</span>
          </div>

          <button
            type="button"
            onClick={() => alert("Google login logic here")}
            className="w-full mt-2 border border-stone-300 text-sm py-2 rounded hover:bg-stone-100 flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-lg" />
            Sign in with Google
          </button>
        </form>
      </div>

      {showForgotModal && (
        <ForgotPasswordModal
          onClose={() => setShowForgotModal(false)}
          onSend={handleSendResetEmail}
        />
      )}
    </div>
  );
};
