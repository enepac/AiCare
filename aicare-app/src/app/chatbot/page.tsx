"use client";

import React, { useEffect, useState } from "react";

type Thread = {
  _id: string;
  title: string;
};

export default function ChatbotPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchThreads() {
      try {
        // Use credentials: 'include' to send the session cookie
        const res = await fetch("/api/chatbot/threads", { credentials: "include" });
        if (!res.ok) {
          setError(`Error: ${res.status} ${res.statusText}`);
          return;
        }

        const data = await res.json();
        setThreads(data.threads || []);
      } catch (err) {
        console.error("Error fetching threads:", err);
        setError("Failed to fetch conversation threads");
      }
    }

    fetchThreads();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Conversation Threads</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <ul className="space-y-4">
        {threads.map((thread) => (
          <li key={thread._id} className="border p-2 rounded shadow-sm">
            <div className="font-semibold">{thread.title}</div>
            <div className="text-xs text-gray-500">Thread ID: {thread._id}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
