"use client";

import { useState } from "react";
import clsx from "clsx";

import Profile from "./Profile";
import MedicalHistory from "./MedicalHistory";
import SymptomLog from "./SymptomLog";
import TestResults from "./TestResults";
import Medications from "./Medications";
import Appointments from "./Appointments";
import Reminders from "./Reminders";
import PrintData from "./PrintData";
import ShareData from "./ShareData";

const tabs = [
  { key: "profile", label: "Patient Profile" },
  { key: "history", label: "Medical History" },
  { key: "symptoms", label: "Symptom Log" },
  { key: "tests", label: "Test Results" },
  { key: "medications", label: "Medications" },
  { key: "appointments", label: "Appointments" },
  { key: "reminders", label: "Reminders" },
  { key: "print", label: "Print Data" },
  { key: "share", label: "Share Data" }
];

export default function PatientData() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex gap-x-4 px-4 py-2 border-b bg-white sticky top-0 z-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={clsx(
              "px-3 py-1 rounded text-sm font-medium transition-all",
              activeTab === tab.key
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-white">
        {activeTab === "profile" && <Profile />}
        {activeTab === "history" && <MedicalHistory />}
        {activeTab === "symptoms" && <SymptomLog />}
        {activeTab === "tests" && <TestResults />}
        {activeTab === "medications" && <Medications />}
        {activeTab === "appointments" && <Appointments />}
        {activeTab === "reminders" && <Reminders />}
        {activeTab === "print" && <PrintData />}
        {activeTab === "share" && <ShareData />}
      </div>
    </div>
  );
}
