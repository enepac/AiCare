"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useViewerContext } from "@/context/ViewerContext";

interface UserProfile {
  name: string;
  email: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  bmi?: number;
  bloodType?: string;
  allergies?: string;
  medications?: string;
  familyHistory?: string;
  activityLevel?: string;
  diet?: string;
  isPregnant?: boolean;
  expectedDeliveryDate?: string;
}

export default function Profile() {
  const { data: session } = useSession();
  const { isViewer } = useViewerContext();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data: UserProfile = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("❌ Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [session]);

  const handleChange = (field: keyof UserProfile, value: string | number | boolean | undefined) => {
    if (isViewer) return;

    let error = "";

    const isValidNumber = (val: unknown, min: number, max: number): val is number =>
      typeof val === "number" && !isNaN(val) && val >= min && val <= max;

    if (field === "age" && !isValidNumber(value, 0, 120)) {
      error = "Age must be between 0 and 120";
    } else if (field === "height" && !isValidNumber(value, 30, 300)) {
      error = "Height must be between 30 and 300 cm";
    } else if (field === "weight" && !isValidNumber(value, 1, 500)) {
      error = "Weight must be between 1 and 500 kg";
    } else if (field === "bmi" && !isValidNumber(value, 10, 100)) {
      error = "BMI must be between 10 and 100";
    } else if (
      ["bloodType", "allergies", "medications", "familyHistory", "activityLevel", "diet"].includes(
        field
      )
    ) {
      if (!value || typeof value !== "string" || value.trim() === "") {
        error = `${field[0].toUpperCase() + field.slice(1)} is required`;
      }
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!profile || isViewer) return;
    setSaving(true);
    setSaveMessage("");

    try {
      const res = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      if (!res.ok) throw new Error("Failed to save profile");
      setSaveMessage("✅ Profile saved successfully.");
    } catch (err) {
      console.error("❌ Save error:", err);
      setSaveMessage("❌ Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Could not load profile.</p>;

  const renderError = (field: string) =>
    errors[field] && <p className="text-red-600 text-sm">{errors[field]}</p>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Patient Profile</h2>

      {isViewer && (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded-md text-sm">
          👁️ You are viewing shared patient data. Editing is disabled.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={profile.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Age"
            value={profile.age ?? ""}
            onChange={(e) => handleChange("age", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          />
          {renderError("age")}
        </div>

        <div>
          <select
            value={profile.gender ?? ""}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <input
            type="number"
            placeholder="Height (cm)"
            value={profile.height ?? ""}
            onChange={(e) => handleChange("height", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          />
          {renderError("height")}
        </div>

        <div>
          <input
            type="number"
            placeholder="Weight (kg)"
            value={profile.weight ?? ""}
            onChange={(e) => handleChange("weight", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          />
          {renderError("weight")}
        </div>

        <div>
          <label className="sr-only">Blood Type</label>
          <select
            value={profile.bloodType ?? ""}
            onChange={(e) => handleChange("bloodType", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          >
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Allergies"
            value={profile.allergies ?? ""}
            onChange={(e) => handleChange("allergies", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Medications"
            value={profile.medications ?? ""}
            onChange={(e) => handleChange("medications", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Family History"
            value={profile.familyHistory ?? ""}
            onChange={(e) => handleChange("familyHistory", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Activity Level"
            value={profile.activityLevel ?? ""}
            onChange={(e) => handleChange("activityLevel", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Diet"
            value={profile.diet ?? ""}
            onChange={(e) => handleChange("diet", e.target.value)}
            className="border p-2 rounded w-full"
            disabled={isViewer}
          />
        </div>

        {profile.gender === "Female" && (
          <div className="col-span-2 space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={profile.isPregnant ?? false}
                onChange={(e) => handleChange("isPregnant", e.target.checked)}
                disabled={isViewer}
              />
              Pregnant?
            </label>

            {profile.isPregnant && (
              <input
                type="date"
                value={profile.expectedDeliveryDate ?? ""}
                onChange={(e) => handleChange("expectedDeliveryDate", e.target.value)}
                className="border p-2 rounded w-full"
                disabled={isViewer}
              />
            )}
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <button
          onClick={handleSave}
          disabled={saving || isViewer}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

        {saveMessage && <p className="text-sm text-gray-700">{saveMessage}</p>}
      </div>
    </div>
  );
}
