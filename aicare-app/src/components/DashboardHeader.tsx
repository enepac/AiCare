"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* User Profile & Notifications */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell (Placeholder for real notifications) */}
        <button className="relative p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition">
          🔔
        </button>

        {/* User Profile */}
        {session?.user ? (
          <div className="flex items-center space-x-3 bg-gray-800 px-4 py-2 rounded-md">
            <Image
              src={session.user.image || "/assets/avatar.png"}
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full border border-gray-500"
            />
            <span className="text-sm">{session.user.name}</span>
          </div>
        ) : (
          <span className="text-sm text-gray-300">Not Logged In</span>
        )}
      </div>
    </header>
  );
}
