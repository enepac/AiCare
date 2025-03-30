"use client";

import { useEffect, useState, useRef } from "react";
import { IMessage } from "@/models/conversation";
import { format } from "date-fns";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FileIcon, ImageIcon, Loader2, Send, Upload } from "lucide-react";
import type { ChatThread } from "@/types/chatbot";

export default function ChatbotWidget({
  threads,
  activeThread,
  setActiveThread,
  refreshThreads
}: {
  threads: ChatThread[];
  activeThread: ChatThread | null;
  setActiveThread: (thread: ChatThread | null) => void;
  refreshThreads: () => Promise<void>;
}) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeThread) return;
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chatbot/threads/${activeThread.threadId}/messages`, {
          credentials: "include"
        });
        const data = await res.json();
        console.log("📨 MESSAGES FOR THREAD:", activeThread.threadId, data.messages);
        setMessages(data.messages || []);
      } catch (err) {
        console.error("❌ Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [activeThread]);

  const handleSend = async () => {
    if (!input.trim() || !activeThread) return;

    console.log("📤 Sending message:", input);

    const userMessage: IMessage = {
      sender: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/api/chatbot/threads/${activeThread.threadId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: input })
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("❌ Failed to get AI response:", res.status, err);
        setLoading(false);
        return;
      }

      const { aiMessage } = await res.json();
      console.log("📥 Received AI message:", aiMessage);

      if (aiMessage?.content) {
        setMessages((prev) => [...prev, aiMessage]);
      }

      if (messages.length === 0 && input.length > 5) {
        const newTitle = input.slice(0, 60) + (input.length > 60 ? "..." : "");
        try {
          await fetch(`/api/chatbot/threads/${activeThread.threadId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ title: newTitle })
          });
          await refreshThreads();
        } catch (err) {
          console.error("❌ Failed to rename thread:", err);
        }
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!threads?.length) return <div className="p-4 text-gray-500">No threads available.</div>;
  if (!activeThread) return <div className="p-4 text-gray-500">No thread selected.</div>;

  return (
    <div className="flex w-full h-full border rounded-lg overflow-hidden">
      {/* Sidebar Thread List */}
      <div className="w-1/4 border-r p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Threads</h2>
          <button
            onClick={async () => {
              const res = await fetch("/api/chatbot/new-thread", {
                method: "POST",
                credentials: "include"
              });
              const data = await res.json();
              setActiveThread(data.thread);
              await refreshThreads();
            }}
            className="text-sm text-blue-600"
          >
            New Chat
          </button>
        </div>

        {threads.map((thread) => (
          <div
            key={thread._id}
            className={clsx(
              "flex items-center justify-between p-2 cursor-pointer rounded hover:bg-gray-100",
              activeThread?.threadId === thread.threadId && "bg-blue-100 font-semibold"
            )}
          >
            {deletingThreadId === thread.threadId ? (
              <div className="flex items-center justify-between w-full text-sm text-gray-700">
                <span>Delete this thread?</span>
                <div className="flex gap-1 ml-2">
                  <button
                    className="text-green-600 hover:text-green-800 text-xs"
                    onClick={async () => {
                      await fetch(`/api/chatbot/threads/${thread.threadId}`, {
                        method: "DELETE",
                        credentials: "include"
                      });

                      await refreshThreads();

                      const res = await fetch("/api/chatbot/threads", {
                        credentials: "include"
                      });
                      const data = await res.json();
                      const sorted = (data.threads || []).sort(
                        (a: ChatThread, b: ChatThread) =>
                          new Date(b.updatedAt ?? 0).getTime() -
                          new Date(a.updatedAt ?? 0).getTime()
                      );
                      setActiveThread(sorted[0] || null);
                      setDeletingThreadId(null);
                    }}
                  >
                    ✔
                  </button>
                  <button
                    className="text-gray-600 hover:text-black text-xs"
                    onClick={() => setDeletingThreadId(null)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ) : (
              <>
                <span onClick={() => setActiveThread(thread)} className="truncate flex-1">
                  {thread.title || thread.preview || "Untitled Thread"}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingThreadId(thread.threadId);
                  }}
                  className="ml-2 text-red-500 hover:text-red-700 text-xs"
                  title="Delete thread"
                >
                  🗑
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Message Area + Input */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={clsx(
                "flex flex-col max-w-[70%] px-4 py-2 rounded-lg",
                msg.sender === "user"
                  ? "bg-blue-100 self-end"
                  : "bg-gray-100 self-start prose prose-sm max-w-none"
              )}
            >
              {msg.sender === "ai" ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                <span>{msg.content}</span>
              )}
              <span className="text-xs text-muted-foreground mt-1">
                {format(new Date(msg.timestamp), "PPP p")}
              </span>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="border-t p-4 flex items-center gap-2">
          <button className="p-2" title="Upload file (feature next)">
            <Upload size={18} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
