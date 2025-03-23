"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Retrieve token from search params
  useEffect(() => {
    // Safely check for searchParams, then get the token or default to null
    const maybeToken = searchParams?.get("token") || null;
    setToken(maybeToken);
  }, [searchParams]);

  // Password reset logic
  const handleResetPassword = async () => {
    setError("");

    if (!token) {
      setError("Invalid or expired reset token.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password })
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Something went wrong.");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/"), 3000); // Redirect to homepage after 3 sec
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        <p className="text-gray-600 text-center mb-4">Enter your new password below.</p>

        {/* Password Input */}
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Success Message */}
        {success && (
          <p className="text-green-500 text-sm text-center">
            ✅ Password reset successful! Redirecting...
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-3 hover:bg-blue-700"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
