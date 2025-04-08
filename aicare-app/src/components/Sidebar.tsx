"use client";

import { useEffect, useState } from "react";

interface SidebarProps {
  activeFeature: string;
  setActiveFeature: (feature: string) => void;
}

export default function Sidebar({ activeFeature, setActiveFeature }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasPendingInvites, setHasPendingInvites] = useState(false);

  const navigate = (feature: string) => {
    setActiveFeature(feature);
  };

  useEffect(() => {
    const checkPendingInvites = async () => {
      try {
        const res = await fetch("/api/patient-data/has-invites");
        if (res.ok) {
          const data = await res.json();
          setHasPendingInvites(data.hasPending === true);
        }
      } catch {
        console.error("❌ Failed to check for pending invites.");
      }
    };

    checkPendingInvites();
  }, []);

  return (
    <aside
      className={`h-screen p-4 transition-all text-white shadow-md ${
        isCollapsed ? "w-16 bg-indigo-700" : "w-64 bg-gradient-to-b from-indigo-600 to-blue-800"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="mb-4 p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </button>

      <nav className="space-y-4">
        <button
          onClick={() => navigate("dashboard")}
          className={`block p-2 rounded transition w-full text-left ${
            activeFeature === "dashboard" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          🏠 {isCollapsed ? "" : "Dashboard"}
        </button>

        <button
          onClick={() => navigate("chatbot")}
          className={`block p-2 rounded transition w-full text-left ${
            activeFeature === "chatbot" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          💬 {isCollapsed ? "" : "Chatbot"}
        </button>

        <button
          onClick={() => navigate("medicalRecords")}
          className={`block p-2 rounded transition w-full text-left ${
            activeFeature === "medicalRecords" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          📂 {isCollapsed ? "" : "Medical Documents"}
        </button>

        <button
          onClick={() => navigate("patientData")}
          className={`block p-2 rounded transition w-full text-left ${
            activeFeature === "patientData" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          📑 {isCollapsed ? "" : "Patient Data"}
        </button>

        <button
          onClick={() => navigate("notifications")}
          className={`relative block p-2 rounded transition w-full text-left ${
            activeFeature === "notifications" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          🔔 {isCollapsed ? "" : "Notifications"}
          {hasPendingInvites && (
            <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>

        <button
          onClick={() => navigate("settings")}
          className={`block p-2 rounded transition w-full text-left ${
            activeFeature === "settings" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          ⚙️ {isCollapsed ? "" : "Settings"}
        </button>
      </nav>
    </aside>
  );
}
