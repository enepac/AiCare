"use client";

import { useEffect, useState, useRef } from "react";
import { IMessage } from "@/models/conversation";
import { format } from "date-fns";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import { Loader2, Send, Upload, Pencil, ClipboardCopy } from "lucide-react";
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
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showCopyToast = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchMessagesForThread = async (threadId: string) => {
    try {
      const res = await fetch(`/api/chatbot/threads/${threadId}/messages`, {
        credentials: "include"
      });
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
    }
  };

  useEffect(() => {
    if (activeThread) fetchMessagesForThread(activeThread.threadId);
  }, [activeThread]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !activeThread) return;

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
      if (aiMessage?.content) {
        setMessages((prev) => [...prev, aiMessage]);
      }

      if (messages.length <= 1) {
        const firstLine = input.split("\n").find((line) => line.trim().length > 0);
        const newTitle = (firstLine ?? input).slice(0, 60);
        try {
          await fetch(`/api/chatbot/threads/${activeThread.threadId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ title: newTitle })
          });
          await refreshThreads();
        } catch (err) {
          console.error("❌ Failed to auto-rename thread:", err);
        }
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeThread) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("threadId", activeThread.threadId);

    try {
      const res = await fetch(`/api/chatbot/threads/${activeThread.threadId}/upload`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      const data = await res.json();

      if (res.ok && data.aiMessage) {
        setMessages((prev) => [...prev, data.aiMessage]);

        const lines = data.aiMessage.content.split("\n").map((line: string) => line.trim());
        const candidateLine =
          lines.find((line: string) => line.toLowerCase().startsWith("name:")) ||
          lines.find((line: string) => line.toLowerCase().includes("record") || line.length > 20);

        const title = (candidateLine ?? "Uploaded Record").slice(0, 60);

        try {
          await fetch(`/api/chatbot/threads/${activeThread.threadId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ title })
          });
          await refreshThreads();
        } catch (err) {
          console.error("❌ Failed to auto-rename thread from upload:", err);
        }
      } else {
        console.error("❌ Upload failed:", data.message);
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex w-full h-full border rounded-lg overflow-hidden relative">
      {/* Sidebar */}
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
              await fetchMessagesForThread(data.thread.threadId);
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
            <span onClick={() => setActiveThread(thread)} className="truncate flex-1">
              {thread.title || thread.preview || "Untitled Thread"}
            </span>
            <button
              onClick={async (e) => {
                e.stopPropagation();

                await fetch(`/api/chatbot/threads/${thread.threadId}`, {
                  method: "DELETE",
                  credentials: "include"
                });

                await refreshThreads();

                const res = await fetch("/api/chatbot/threads", {
                  credentials: "include"
                });
                const data = await res.json();

                if (!data.threads || data.threads.length === 0) {
                  const newRes = await fetch("/api/chatbot/new-thread", {
                    method: "POST",
                    credentials: "include"
                  });
                  const newData = await newRes.json();

                  const msgRes = await fetch(
                    `/api/chatbot/threads/${newData.thread.threadId}/messages`,
                    { credentials: "include" }
                  );
                  const msgData = await msgRes.json();

                  setMessages(msgData.messages || []);
                  setActiveThread(newData.thread);
                } else {
                  const sorted = data.threads.sort(
                    (a: ChatThread, b: ChatThread) =>
                      new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime()
                  );
                  setActiveThread(sorted[0]);
                }
              }}
              className="ml-2 text-red-500 hover:text-red-700 text-xs"
              title="Delete thread"
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div
          className={clsx(
            "flex-1 overflow-y-auto p-4 space-y-4",
            !activeThread || messages.length === 0
              ? "flex items-center justify-center text-sm text-gray-500"
              : ""
          )}
        >
          {!activeThread ? (
            <span>Loading new conversation...</span>
          ) : messages.length === 0 ? (
            <span>Start chatting to begin the conversation</span>
          ) : null}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={clsx(
                "relative flex flex-col max-w-[70%] px-4 py-2 rounded-lg",
                msg.sender === "user"
                  ? "bg-blue-100 self-end"
                  : "bg-gray-100 self-start prose prose-sm max-w-none"
              )}
            >
              {msg.sender === "ai" ? (
                <div className="relative rounded-2xl p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <ReactMarkdown
                    components={{
                      p: (props) => (
                        <p
                          className="whitespace-pre-wrap mb-2 text-gray-800 leading-relaxed"
                          {...props}
                        />
                      )
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(msg.content);
                      showCopyToast();
                    }}
                    className="absolute bottom-2 right-2 text-gray-500 hover:text-gray-800"
                    title="Copy to clipboard"
                  >
                    <ClipboardCopy size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <span>{msg.content}</span>
                  <button
                    onClick={() => setInput(msg.content)}
                    className="absolute bottom-1 right-2 text-blue-500 hover:text-blue-700"
                    title="Edit & Resend"
                  >
                    <Pencil size={16} />
                  </button>
                </>
              )}
              <span className="text-xs text-muted-foreground mt-1">
                {format(new Date(msg.timestamp), "PPP p")}
              </span>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="border-t p-4 flex items-center gap-2">
          <input
            type="file"
            accept="application/pdf,image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="p-2 rounded hover:bg-gray-100"
            title="Upload PDF/Image"
          >
            {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
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

      {copied && (
        <div className="fixed bottom-4 right-4 bg-black text-white text-sm px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-300">
          ✅ Copied!
        </div>
      )}
    </div>
  );
}
