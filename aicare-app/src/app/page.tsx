"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
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
        const loginResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false
        });

        if (!loginResult?.error) {
          router.replace("/auth-check");
        } else {
          setError("Signup successful, but auto-login failed. Please log in manually.");
        }
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } else {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.replace("/auth-check");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 p-4">
      <div className="text-center text-white py-8">
        <h1 className="text-4xl font-bold">Welcome to AiCare</h1>
        <p className="text-lg mt-2 max-w-2xl mx-auto">
          Your AI-powered healthcare assistant. Get insights, track symptoms, and manage your
          medical history seamlessly.
        </p>
      </div>

      <div className="bg-white bg-opacity-90 shadow-xl rounded-xl p-8 w-full max-w-md backdrop-blur-md">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="AiCare Logo"
            width={160}
            height={100}
            priority
            className="mx-auto mb-3"
          />
          <h2 className="text-lg font-semibold text-gray-800">Welcome to AiCare</h2>
          <p className="text-sm text-gray-600">
            {isSignup ? "Create an Account" : "Log in to continue"}
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-sky-400"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-sky-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-sky-400"
            required
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-sky-600 text-white font-semibold py-3 rounded-lg hover:bg-sky-700 transition duration-200"
          >
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-sky-600 hover:underline text-sm font-medium"
          >
            {isSignup ? "Already have an account? Log In" : "Don't have an account? Create Account"}
          </button>

          <div>
            <a href="/auth/forgot-password" className="text-sky-600 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/auth-check" })}
            className="mt-3 w-full flex items-center justify-center space-x-2 rounded-lg border border-gray-300 px-4 py-3 hover:bg-gray-100 transition duration-200"
          >
            <Image src="/google-icon.png" alt="Google" width={20} height={20} className="w-5 h-5" />
            <span>Sign in with Google</span>
          </button>
        </div>

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
