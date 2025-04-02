"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isViewer, setIsViewer] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data: UserProfile = await res.json();
      setProfile(data);

      if (session?.user?.email && session.user.email !== data.email) {
        setIsViewer(true);
      }
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
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!profile || isViewer) return;
    setSaving(true);
    setSaveMessage("");
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
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
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Patient Profile</h2>

      {isViewer && (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded-md text-sm">
          👁️ You are viewing shared patient data. Editing is disabled.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={profile.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

        <input
          type="number"
          placeholder="Age"
          value={profile.age ?? ""}
          onChange={(e) => handleChange("age", Number(e.target.value))}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

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

        <input
          type="number"
          placeholder="Height (cm)"
          value={profile.height ?? ""}
          onChange={(e) => handleChange("height", Number(e.target.value))}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={profile.weight ?? ""}
          onChange={(e) => handleChange("weight", Number(e.target.value))}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

        <input
          type="text"
          placeholder="Blood Type"
          value={profile.bloodType ?? ""}
          onChange={(e) => handleChange("bloodType", e.target.value)}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

        <input
          type="text"
          placeholder="Allergies"
          value={profile.allergies ?? ""}
          onChange={(e) => handleChange("allergies", e.target.value)}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

        <input
          type="text"
          placeholder="Medications"
          value={profile.medications ?? ""}
          onChange={(e) => handleChange("medications", e.target.value)}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

        <input
          type="text"
          placeholder="Family History"
          value={profile.familyHistory ?? ""}
          onChange={(e) => handleChange("familyHistory", e.target.value)}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

        <input
          type="text"
          placeholder="Activity Level"
          value={profile.activityLevel ?? ""}
          onChange={(e) => handleChange("activityLevel", e.target.value)}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

        <input
          type="text"
          placeholder="Diet"
          value={profile.diet ?? ""}
          onChange={(e) => handleChange("diet", e.target.value)}
          className="border p-2 rounded w-full"
          disabled={isViewer}
        />

        {/* Pregnancy Toggle */}
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
