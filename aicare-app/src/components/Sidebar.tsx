"use client";

import { useState } from "react";

interface SidebarProps {
  setActiveFeature: (feature: string) => void;
}

export default function Sidebar({ setActiveFeature }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen p-4 transition-all text-white shadow-md ${
        isCollapsed ? "w-16 bg-indigo-700" : "w-64 bg-gradient-to-b from-indigo-600 to-blue-800"
      }`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-4 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </button>

      {/* Navigation Links */}
      <nav className="space-y-4">
        <button
          onClick={() => setActiveFeature("dashboard")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          🏠 {isCollapsed ? "" : "Dashboard"}
        </button>
        <button
          onClick={() => setActiveFeature("chatbot")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          💬 {isCollapsed ? "" : "Chatbot"}
        </button>
        <button
          onClick={() => setActiveFeature("appointments")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          📅 {isCollapsed ? "" : "Appointments"}
        </button>
        <button
          onClick={() => setActiveFeature("medications")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          💊 {isCollapsed ? "" : "Medications"}
        </button>
        <button
          onClick={() => setActiveFeature("medicalRecords")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          📂 {isCollapsed ? "" : "Medical Records"}
        </button>
        <button
          onClick={() => setActiveFeature("settings")}
          className="block p-2 hover:bg-indigo-700 rounded transition w-full text-left"
        >
          ⚙️ {isCollapsed ? "" : "Settings"}
        </button>
      </nav>
    </aside>
  );
}
