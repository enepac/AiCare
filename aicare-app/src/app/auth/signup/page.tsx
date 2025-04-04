"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SignupPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams?.get("ref") ?? null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; text: string } | null>(
    null
  );

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("Password must be at least 8 characters long.");
    if (!/[A-Z]/.test(password)) errors.push("Must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Must contain at least one lowercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Must contain at least one number.");
    if (!/[^A-Za-z0-9]/.test(password)) errors.push("Must contain at least one special character.");
    return errors;
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    setPasswordErrors(validatePassword(val));
  };

  const handleSubmit = async () => {
    setFeedback(null);

    if (password !== confirmPassword) {
      setFeedback({ type: "error", text: "Passwords do not match." });
      return;
    }

    if (passwordErrors.length > 0) {
      setFeedback({ type: "error", text: "Please fix password issues first." });
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, ref })
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback({ type: "success", text: data.message || "Account created successfully!" });
        setTimeout(() => router.push("/auth/signin"), 1500);
      } else {
        setFeedback({ type: "error", text: data.message || "Signup failed." });
      }
    } catch {
      setFeedback({ type: "error", text: "Something went wrong. Try again." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center">Create an Account</h2>
        <p className="text-gray-600 text-center mb-4">Enter your details below.</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded my-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded my-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          className="w-full border p-3 rounded my-2"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-3 rounded my-2"
        />

        {passwordErrors.length > 0 && (
          <ul className="text-red-500 text-sm text-left list-disc pl-5">
            {passwordErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}

        {feedback && (
          <p
            className={`mt-2 text-sm ${
              feedback.type === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {feedback.text}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg mt-4 hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignupPageContent />
    </Suspense>
  );
}
