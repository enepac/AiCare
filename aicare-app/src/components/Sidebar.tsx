"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname() || "";

  const navigate = (path: string) => {
    router.push(path);
  };

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
          onClick={() => navigate("/dashboard")}
          className={`block p-2 rounded transition w-full text-left ${
            pathname === "/dashboard" ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          🏠 {isCollapsed ? "" : "Dashboard"}
        </button>
        <button
          onClick={() => navigate("/dashboard/chatbot")}
          className={`block p-2 rounded transition w-full text-left ${
            pathname.startsWith("/dashboard/chatbot") ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          💬 {isCollapsed ? "" : "Chatbot"}
        </button>
        <button
          onClick={() => navigate("/dashboard/appointments")}
          className={`block p-2 rounded transition w-full text-left ${
            pathname.startsWith("/dashboard/appointments") ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          📅 {isCollapsed ? "" : "Appointments"}
        </button>
        <button
          onClick={() => navigate("/dashboard/medications")}
          className={`block p-2 rounded transition w-full text-left ${
            pathname.startsWith("/dashboard/medications") ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          💊 {isCollapsed ? "" : "Medications"}
        </button>
        <button
          onClick={() => navigate("/dashboard/medical-records")}
          className={`block p-2 rounded transition w-full text-left ${
            pathname.startsWith("/dashboard/medical-records")
              ? "bg-indigo-700"
              : "hover:bg-indigo-700"
          }`}
        >
          📂 {isCollapsed ? "" : "Medical Records"}
        </button>
        <button
          onClick={() => navigate("/dashboard/settings")}
          className={`block p-2 rounded transition w-full text-left ${
            pathname.startsWith("/dashboard/settings") ? "bg-indigo-700" : "hover:bg-indigo-700"
          }`}
        >
          ⚙️ {isCollapsed ? "" : "Settings"}
        </button>
      </nav>
    </aside>
  );
}
