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
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    }
    fetchProfileData();
  }, []);

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

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 0));
  const handleSkip = () => router.replace("/dashboard");

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-2xl border-t-4 border-indigo-400">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">Profile Setup</h1>
          <p className="text-gray-500">
            Step <span className="font-medium text-indigo-500">{step + 1}</span> of {steps.length}:{" "}
            {steps[step]}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          {steps.map((label, index) => (
            <div key={index} className="flex-1 flex flex-col items-center relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  index <= step
                    ? "bg-indigo-500 border-indigo-500 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-xs mt-1 ${index <= step ? "text-indigo-500" : "text-gray-400"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-gray-50 rounded-md shadow-inner">
              {step === 0 && (
                <>
                  <label className="block text-sm text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    disabled
                    className="w-full p-2 mb-3 border rounded bg-gray-100"
                  />

                  <label className="block text-sm text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  />

                  <label className="block text-sm text-gray-700">Gender</label>
                  <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  >
                    <option>Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>

                  {profile.gender === "Female" && (
                    <>
                      <label className="block text-sm text-gray-700">Pregnant</label>
                      <select
                        name="isPregnant"
                        value={profile.isPregnant ? "true" : "false"}
                        onChange={handleChange}
                        className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                      </select>
                    </>
                  )}
                </>
              )}
              {step === 1 && (
                <>
                  <label className="block text-sm text-gray-700">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={profile.height ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  />

                  <label className="block text-sm text-gray-700">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={profile.weight ?? ""}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  />

                  <label className="block text-sm text-gray-700">BMI</label>
                  <input
                    type="number"
                    name="bmi"
                    value={profile.bmi ?? ""}
                    disabled
                    className="w-full p-2 mb-3 border rounded bg-gray-100"
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <label className="block text-sm text-gray-700">Blood Type</label>
                  <input
                    type="text"
                    name="bloodType"
                    value={profile.bloodType}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  />

                  <label className="block text-sm text-gray-700">Allergies</label>
                  <input
                    type="text"
                    name="allergies"
                    value={profile.allergies}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  />

                  <label className="block text-sm text-gray-700">Medications</label>
                  <input
                    type="text"
                    name="medications"
                    value={profile.medications}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <label className="block text-sm text-gray-700">Family History</label>
                  <input
                    type="text"
                    name="familyHistory"
                    value={profile.familyHistory}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  />

                  <label className="block text-sm text-gray-700">Activity Level</label>
                  <input
                    type="text"
                    name="activityLevel"
                    value={profile.activityLevel}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  />

                  <label className="block text-sm text-gray-700">Diet</label>
                  <input
                    type="text"
                    name="diet"
                    value={profile.diet}
                    onChange={handleChange}
                    className="w-full p-2 mb-3 border rounded focus:ring-2 focus:ring-indigo-400"
                  />
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              onClick={handlePrev}
              className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
            >
              Previous
            </button>
          )}

          {step < steps.length - 1 && (
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-200"
            >
              Next
            </button>
          )}

          {step === steps.length - 1 && (
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleSkip}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline transition duration-200"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
