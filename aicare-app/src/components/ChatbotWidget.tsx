"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import io from "socket.io-client";
import { Pencil, Trash2, Plus, Check } from "lucide-react";
import axios from "axios";

const socket = io(process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:4000", {
  path: "/api/socketio"
});

interface Message {
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

export default function ChatbotWidget(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();
  const threadId = searchParams?.get("threadId");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [threadTitle, setThreadTitle] = useState("Untitled Thread");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  // Auto-create a thread if none exists in the URL
  useEffect(() => {
    if (!threadId) {
      axios.post("/api/chatbot/new-thread").then((res) => {
        router.replace(`/dashboard/chatbot?threadId=${res.data.threadId}`);
      });
    }
  }, [threadId, router]);

  // Load thread messages and listen for real-time updates
  useEffect(() => {
    if (!threadId) return;

    socket.emit("join_thread", threadId);

    socket.on("new_message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    axios
      .get(`/api/chatbot/threads/${threadId}`)
      .then((res) => {
        setMessages(res.data.messages || []);
        setThreadTitle(res.data.title || "Untitled Thread");
        setEditedTitle(res.data.title || "Untitled Thread");
      })
      .catch(async (err) => {
        if (err.response?.status === 404) {
          const res = await axios.post("/api/chatbot/new-thread", { title: "Default Thread" });
          router.replace(`/dashboard/chatbot?threadId=${res.data.threadId}`);
        }
      });

    return () => {
      socket.emit("leave_thread", threadId);
      socket.off("new_message");
    };
  }, [threadId, router]);

  const sendMessage = async () => {
    console.log("💬 Send button clicked");

    if (!input.trim()) {
      console.warn("⚠️ No message to send.");
      return;
    }

    if (!threadId) {
      console.error("❌ threadId missing.");
      return;
    }

    console.log("📤 Sending message:", input, "→ threadId:", threadId);

    await fetch(`/api/chatbot/threads/${threadId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input })
    }).catch((err) => {
      console.error("❌ Failed to send:", err);
    });

    setInput("");
  };

  const handleRename = async () => {
    if (!threadId) return;
    await axios.patch(`/api/chatbot/threads/${threadId}`, { title: editedTitle });
    setThreadTitle(editedTitle);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!threadId) return;
    await axios.delete(`/api/chatbot/threads/${threadId}`);
    router.replace("/dashboard/chatbot");
  };

  const handleNewThread = async () => {
    const { data } = await axios.post("/api/chatbot/new-thread");
    router.replace(`/dashboard/chatbot?threadId=${data.threadId}`);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4 bg-white">
        {isEditing ? (
          <div className="flex items-center gap-2 w-full">
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border rounded px-2 py-1 flex-1"
            />
            <button onClick={handleRename} className="text-green-600 hover:text-green-800">
              <Check className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold truncate max-w-[200px]">{threadTitle}</h2>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-3">
          <button onClick={handleNewThread} className="text-indigo-600 hover:text-indigo-800">
            <Plus className="h-5 w-5" />
          </button>
          <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t px-4 py-3 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
