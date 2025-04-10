"use client";
import { useState, useEffect, ChangeEvent } from "react";

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
  expectedDeliveryDate?: string;
}

const PatientProfile = ({ editable = false }: { editable?: boolean }) => {
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
    diet: "",
    expectedDeliveryDate: ""
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number | boolean = value;

    if (["age", "height", "weight", "bmi"].includes(name)) {
      parsedValue = Number(value);
    } else if (name === "isPregnant") {
      parsedValue = value === "true";
    }

    setProfile((prev) => {
      const updated = { ...prev, [name]: parsedValue };

      if (name === "height" || name === "weight") {
        const { height, weight } = updated;
        if (height && weight) {
          const heightM = Number(height) / 100;
          updated.bmi = parseFloat((Number(weight) / (heightM * heightM)).toFixed(1));
        } else {
          updated.bmi = null;
        }
      }

      return updated;
    });
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      });

      if (!res.ok) {
        const err = await res.json();
        setMessage("❌ Save failed: " + (err.error || "Unknown error"));
        return;
      }

      setMessage("✅ Profile updated successfully");
    } catch (err) {
      console.error("❌ Error saving:", err);
      setMessage("❌ Save failed due to network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Patient Profile</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:underline"
        >
          {isExpanded ? "🔼 Collapse" : "🔽 Expand"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          name="name"
          value={profile.name}
          disabled
          className="w-full p-2 border rounded-md bg-gray-100"
        />

        <input
          type="number"
          name="age"
          value={profile.age}
          disabled={!editable}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
        />

        <select
          name="gender"
          value={profile.gender}
          disabled={!editable}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select
          name="bloodType"
          value={profile.bloodType}
          disabled={!editable}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
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

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input
            type="number"
            name="height"
            value={profile.height ?? ""}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            placeholder="Height (cm)"
          />

          <input
            type="number"
            name="weight"
            value={profile.weight ?? ""}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            placeholder="Weight (kg)"
          />

          <input
            type="number"
            name="bmi"
            value={profile.bmi ?? ""}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100"
            placeholder="BMI"
          />

          {profile.gender === "Female" && (
            <select
              name="isPregnant"
              value={profile.isPregnant ? "true" : "false"}
              disabled={!editable}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          )}

          <input
            type="text"
            name="allergies"
            value={profile.allergies}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            placeholder="Allergies"
          />

          <input
            type="text"
            name="medications"
            value={profile.medications}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            placeholder="Medications"
          />

          <input
            type="text"
            name="familyHistory"
            value={profile.familyHistory}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            placeholder="Family History"
          />

          <input
            type="text"
            name="activityLevel"
            value={profile.activityLevel}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            placeholder="Activity Level"
          />

          <input
            type="text"
            name="diet"
            value={profile.diet}
            disabled={!editable}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${!editable ? "bg-gray-100" : ""}`}
            placeholder="Diet"
          />
        </div>
      )}

      {editable && (
        <div className="mt-4 flex gap-4 items-center">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
          {message && <p className="text-sm text-gray-600">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
