"use client";
import { useState } from "react";
import { ChangeEvent } from "react"; // ✅ Import ChangeEvent from React

interface PatientProfileProps {
  name: string;
  age: number;
  gender: string;
  height: number | null;
  weight: number | null;
  bmi: number | null;
  bloodType: string;
  pregnant: boolean; // ✅ Ensure correct prop name
  allergies: string;
  medications: string;
  familyHistory: string;
  activityLevel: string;
  diet: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePregnantChange: (value: boolean) => void; // ✅ This must be passed from Dashboard
}

const PatientProfile: React.FC<PatientProfileProps> = ({
  name,
  age,
  gender,
  height,
  weight,
  bmi,
  bloodType,
  pregnant,
  allergies,
  medications,
  familyHistory,
  activityLevel,
  diet,
  handleChange,
  handlePregnantChange // ✅ Accept new handler
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

      {/* Essential Details (Always Visible) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={age}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={gender}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Type</label>
          <select
            name="bloodType"
            value={bloodType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
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
      </div>

      {/* Expanded Details (Hidden Until Expanded) */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={height || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={weight || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">BMI</label>
            <input
              type="number"
              name="bmi"
              value={bmi || ""}
              disabled
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>

          {/* ✅ Show Pregnant Field Only for Female */}
          {/* ✅ Show Pregnant Field Only for Female */}
          {gender === "Female" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Pregnant</label>
              <select
                name="isPregnant"
                value={pregnant ? "true" : "false"}
                onChange={(e) => handlePregnantChange(e.target.value === "true")} // ✅ Pass boolean directly
                className="w-full p-2 border rounded-md"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Allergies</label>
            <input
              type="text"
              name="allergies"
              value={allergies}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Medications</label>
            <input
              type="text"
              name="medications"
              value={medications}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Family History</label>
            <input
              type="text"
              name="familyHistory"
              value={familyHistory}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Activity Level</label>
            <input
              type="text"
              name="activityLevel"
              value={activityLevel}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Diet</label>
            <input
              type="text"
              name="diet"
              value={diet}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
