"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => signIn("credentials", { email, password, callbackUrl: "/profile" }), 2000);
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section (Black) */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-black p-8 text-white md:flex">
        <blockquote className="max-w-md space-y-4 text-lg">
          <p>
            &ldquo;This library has saved me countless hours of work and helped me deliver stunning
            designs to my clients faster than ever before.&rdquo;
          </p>
          <footer className="text-sm text-gray-400">— Sofia Davis</footer>
        </blockquote>
      </div>

      {/* Right Section (Form) */}
      <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-2xl font-semibold">Create an account</h1>

          {/* Name input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Email input */}
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Error & Success Messages */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Sign up Button */}
          <button
            onClick={handleSignup}
            className="w-full rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Sign up
          </button>

          {/* Sign in with Google */}
          <button
            type="button"
            onClick={() => signIn("google")}
            className="w-full rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Or Sign in with Google
          </button>

          {/* Terms and Privacy */}
          <p className="text-sm text-gray-600">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
