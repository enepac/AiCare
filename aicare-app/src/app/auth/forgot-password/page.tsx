"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Password reset link sent to your email.");
    } else {
      setMessage(data.message || "❌ Failed to send reset link.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-4">Forgot Password</h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Enter your email to receive a password reset link.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </div>
    </div>
  );
}
