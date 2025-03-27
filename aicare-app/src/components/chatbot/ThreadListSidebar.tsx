"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pencil, Trash2, Plus, Check } from "lucide-react";
import axios from "axios";

interface Thread {
  threadId: string;
  title: string;
}

export default function ThreadListSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeThreadId = searchParams?.get("threadId");

  const [threads, setThreads] = useState<Thread[]>([]);
  const [editThreadId, setEditThreadId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    const { data } = await axios.get("/api/chatbot/threads");
    setThreads(data.threads || []);
  };

  const handleSelect = (threadId: string) => {
    router.push(`/dashboard/chatbot?threadId=${threadId}`);
  };

  const handleDelete = async (threadId: string) => {
    await axios.delete(`/api/chatbot/threads/${threadId}`);
    await fetchThreads();
    router.replace("/dashboard/chatbot");
  };

  const handleRename = async (threadId: string) => {
    await axios.patch(`/api/chatbot/threads/${threadId}`, { title: editedTitle });
    setEditThreadId(null);
    setEditedTitle("");
    await fetchThreads();
  };

  const handleNewThread = async () => {
    const { data } = await axios.post("/api/chatbot/new-thread");
    router.push(`/dashboard/chatbot?threadId=${data.threadId}`);
    await fetchThreads();
  };

  return (
    <aside className="w-64 h-full border-r p-4 bg-gray-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Threads</h2>
        <button
          onClick={handleNewThread}
          className="text-indigo-600 hover:text-indigo-800"
          title="New Thread"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <ul className="space-y-2">
        {threads.map((thread) => (
          <li
            key={thread.threadId}
            className={`group flex items-center justify-between px-3 py-2 rounded cursor-pointer ${
              thread.threadId === activeThreadId ? "bg-indigo-600 text-white" : "hover:bg-gray-200"
            }`}
            onClick={() => handleSelect(thread.threadId)}
          >
            {editThreadId === thread.threadId ? (
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename(thread.threadId);
                }}
                className="flex-1 rounded border px-2 py-1 text-black"
                autoFocus
              />
            ) : (
              <span className="truncate flex-1">{thread.title || "Untitled"}</span>
            )}

            <div className="flex items-center gap-2 ml-2">
              {editThreadId === thread.threadId ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRename(thread.threadId);
                  }}
                  className="text-green-500 hover:text-green-700"
                >
                  <Check className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditThreadId(thread.threadId);
                    setEditedTitle(thread.title);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(thread.threadId);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
