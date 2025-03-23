"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image"; // ✅ Next.js optimized Image component

export default function LandingPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  // ✅ Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Login or Signup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      // ✅ Handle Signup
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullname,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Auto-login after signup
        const loginResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false
        });

        if (!loginResult?.error) {
          router.replace("/auth-check"); // ✅ Redirect to profile check
        } else {
          setError("Signup successful, but auto-login failed. Please log in manually.");
        }
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } else {
      // ✅ Handle Login
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.replace("/auth-check"); // ✅ Redirect to profile check
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* 🚀 Hero Section */}
      <div className="w-full bg-blue-600 text-white text-center py-10 px-6">
        <h1 className="text-4xl font-bold">Welcome to AiCare</h1>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          Your AI-powered healthcare assistant. Get insights, track symptoms, and manage your
          medical history seamlessly.
        </p>
      </div>

      {/* Authentication Box */}
      <div className="bg-white shadow-lg rounded-lg p-8 mt-2 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="AiCare Logo"
            width={160} // ✅ Adjusted size for optimization
            height={100}
            priority // ✅ Ensures logo loads fast
            className="mx-auto mb-3"
          />
          <h2 className="text-lg font-semibold">Welcome to AiCare</h2>
          <p className="text-sm text-gray-600">
            {isSignup ? "Create an Account" : "Log in to continue"}
          </p>
        </div>

        {/* Form Section */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Field - Visible for Signup Only */}
          {isSignup && (
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
              required
            />
          )}

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Login/Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700"
          >
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>

        {/* Additional Actions */}
        <div className="mt-4 text-center space-y-2">
          {/* Toggle Between Login & Signup */}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            {isSignup ? "Already have an account? Log In" : "Don't have an account? Create Account"}
          </button>

          {/* Forgot Password */}
          <div>
            <a href="/auth/forgot-password" className="text-blue-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/auth-check" })}
            className="mt-3 w-full flex items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-100"
          >
            <Image src="/google-icon.png" alt="Google" width={20} height={20} className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Footer Section */}
        <div className="mt-4 text-center text-xs text-gray-500">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
