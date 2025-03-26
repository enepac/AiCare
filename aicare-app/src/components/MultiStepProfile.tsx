"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Basic Info", "Physical Attributes", "Medical History", "Lifestyle"];

interface ProfileData {
  name: string;
  age: number;
  gender: string;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  bloodType: string;
  isPregnant: boolean;
  allergies: string;
  medications: string;
  familyHistory: string;
  activityLevel: string;
  diet: string;
}

export default function MultiStepProfile() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    age: 0,
    gender: "",
    height: null,
    weight: null,
    bmi: null,
    bloodType: "",
    isPregnant: false,
    allergies: "",
    medications: "",
    familyHistory: "",
    activityLevel: "",
    diet: ""
  });

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || "",
            age: data.age ?? 0,
            gender: data.gender || "",
            height: data.height ?? null,
            weight: data.weight ?? null,
            bmi: data.bmi ?? null,
            bloodType: data.bloodType || "",
            isPregnant: data.isPregnant ?? false,
            allergies: data.allergies || "",
            medications: data.medications || "",
            familyHistory: data.familyHistory || "",
            activityLevel: data.activityLevel || "",
            diet: data.diet || ""
          });
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      }
    }

    fetchProfileData();
  }, []);

  // ✅ Handle Input Changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let updatedValue: string | number | boolean | null = value;

    if (["age", "height", "weight"].includes(name)) {
      updatedValue = Number(value);
    } else if (name === "isPregnant") {
      updatedValue = value === "true";
    }

    setProfile((prev) => {
      const updatedProfile = { ...prev, [name]: updatedValue };

      // ✅ Auto-calculate BMI when height or weight changes
      if (name === "height" || name === "weight") {
        const { height, weight } = updatedProfile;
        if (height && weight) {
          const heightInMeters = height / 100;
          updatedProfile.bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
        } else {
          updatedProfile.bmi = null;
        }
      }

      return updatedProfile;
    });
  };

  // ✅ Step Navigation Handlers
  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleSkip = () => router.replace("/dashboard");

  // ✅ Save Profile and Go to Dashboard
  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      router.replace("/dashboard");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Profile Setup</h1>
      <p className="text-gray-600 mb-4">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        {/* ✅ Step 1: Basic Info */}
        {step === 0 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              disabled
              className="w-full p-2 mb-3 border bg-gray-100"
            />

            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {profile.gender === "Female" && (
              <>
                <label className="block text-sm font-medium text-gray-700">Pregnant</label>
                <select
                  name="isPregnant"
                  value={profile.isPregnant ? "true" : "false"}
                  onChange={handleChange}
                  className="w-full p-2 mb-3 border"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </>
            )}
          </>
        )}

        {/* ✅ Step 2: Physical Attributes */}
        {step === 1 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={profile.height ?? ""}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={profile.weight ?? ""}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">BMI</label>
            <input
              type="number"
              name="bmi"
              value={profile.bmi ?? ""}
              disabled
              className="w-full p-2 mb-3 border bg-gray-100"
            />
          </>
        )}

        {/* ✅ Step 3: Medical History */}
        {step === 2 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Blood Type</label>
            <input
              type="text"
              name="bloodType"
              value={profile.bloodType}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={profile.allergies}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Medications</label>
            <input
              type="text"
              name="medications"
              value={profile.medications}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />
          </>
        )}

        {/* ✅ Step 4: Lifestyle */}
        {step === 3 && (
          <>
            <label className="block text-sm font-medium text-gray-700">Family History</label>
            <input
              type="text"
              name="familyHistory"
              value={profile.familyHistory}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <input
              type="text"
              name="activityLevel"
              value={profile.activityLevel}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />

            <label className="block text-sm font-medium text-gray-700">Diet</label>
            <input
              type="text"
              name="diet"
              value={profile.diet}
              onChange={handleChange}
              className="w-full p-2 mb-3 border"
            />
          </>
        )}

        {/* ✅ Step Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              onClick={handlePrev}
              className="w-2/5 bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-2/5 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSaveProfile}
              className="w-2/5 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <button onClick={handleSkip} className="mt-4 text-sm text-gray-500 underline">
          Skip for now
        </button>
      </div>
    </div>
  );
}
