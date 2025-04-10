"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import ChatbotWidget from "@/components/ChatbotWidget";
import type { ChatThread } from "@/types/chatbot";

export default function ChatbotPage() {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);

  console.log("🟢 ChatbotPage rendered");

  useEffect(() => {
    console.log("🔄 useEffect starting: fetching threads");

    const fetchThreads = async () => {
      try {
        const res = await fetch("/api/chatbot/threads", {
          credentials: "include"
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ THREAD FETCH FAILED:", res.status, errorText);
          return;
        }

        const data = await res.json();
        console.log("✅ THREADS FROM API:", data.threads);
        setThreads(data.threads || []);
        if (data.threads?.length) {
          setActiveThread(data.threads[0]);
        }
      } catch (err) {
        console.error("❌ THREAD FETCH ERROR:", err);
      }
    };

    fetchThreads();
  }, []);

  if (!threads.length) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-500 text-sm">
        Loading threads...
      </div>
    );
  }

  return (
    <div className="h-full w-full flex">
      <ChatbotWidget
        threads={threads}
        activeThread={activeThread}
        setActiveThread={setActiveThread}
        refreshThreads={async () => {
          const res = await fetch("/api/chatbot/threads", {
            credentials: "include"
          });
          const data = await res.json();
          setThreads(data.threads || []);
        }}
      />
    </div>
  );
}
