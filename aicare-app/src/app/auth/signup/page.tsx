"use client";
import { useState } from "react";

export default function SignupPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    return errors;
  };

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    const errors = validatePassword(newPassword);
    setPasswordErrors([...errors]); // ✅ Fix: Ensure setPasswordErrors is updated correctly
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Create an Account</h2>
        <p className="text-gray-600 text-center mb-4">Enter your details below.</p>

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 my-2 focus:ring-2 focus:ring-blue-500"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 my-2 focus:ring-2 focus:ring-blue-500"
        />

        {/* Password Errors */}
        {passwordErrors.length > 0 && (
          <ul className="text-red-500 text-sm text-left list-disc pl-5">
            {passwordErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-3 hover:bg-blue-700">
          Sign Up
        </button>
      </div>
    </div>
  );
}
