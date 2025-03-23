"use client";

import { useState } from "react";

export default function ProfileSetupTest() {
  const [message, setMessage] = useState("");

  const handleTestUpdate = async () => {
    const res = await fetch("/api/profile/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        age: 30,
        gender: "Male",
        healthGoal: "Improve fitness"
      })
    });

    const data = await res.json();
    setMessage(data.message || "Error updating profile");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Test Profile Update</h1>
      <button className="bg-blue-500 text-white p-2 rounded mt-4" onClick={handleTestUpdate}>
        Test API
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
