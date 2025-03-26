"use client";

import React, { useEffect, useState, FormEvent, useRef } from "react";
import { useParams } from "next/navigation";
import { io, Socket } from "socket.io-client";

function getParamString(params: Record<string, string | string[]> | null, key: string): string {
  if (!params) {
    throw new Error(`Params object is null; expected '${key}'.`);
  }
  const val = params[key];
  if (!val) {
    throw new Error(`Route param '${key}' not found.`);
  }
  if (Array.isArray(val)) {
    return val[0];
  }
  return val;
}

interface Message {
  _id?: string;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

interface Conversation {
  _id: string;
  userId: string;
  title: string;
  messages: Message[];
}

export default function ThreadPage() {
  // 1) Grab raw params
  const rawParams = useParams(); // type is Record<string, string | string[]> | null

  // 2) Safely extract threadId as a string
  const threadId = getParamString(rawParams, "threadId");

  // The rest is unchanged
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    async function fetchThread() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/chatbot/threads/${threadId}`, {
          credentials: "include"
        });
        if (!res.ok) {
          setError(`Error ${res.status}: ${res.statusText}`);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setConversation(data.conversation);
      } catch (err) {
        console.error("Error fetching conversation:", err);
        setError("Failed to fetch conversation");
      } finally {
        setLoading(false);
      }
    }
    if (threadId) fetchThread();
  }, [threadId]);

  useEffect(() => {
    if (!threadId) return;
    const socket = io("http://localhost:4000", {
      transports: ["websocket"]
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("joinConversation", threadId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });

    socket.on("newMessage", (newMsg: Message) => {
      setConversation((prev) => {
        if (!prev) return prev;
        return { ...prev, messages: [...prev.messages, newMsg] };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [threadId]);

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await fetch(`/api/chatbot/threads/${threadId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          sender: "user",
          content: newMessage
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || `Error ${res.status}`);
        return;
      }
      const updated = await res.json();
      setConversation(updated.conversation);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    }
  }

  if (loading) {
    return <div className="p-4">Loading conversation...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }
  if (!conversation) {
    return <div className="p-4 text-gray-600">Conversation not found.</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Thread: {conversation.title}</h1>
      <div className="space-y-2 border rounded p-4">
        {conversation.messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
        {conversation.messages.map((msg) => (
          <div
            key={msg._id || Math.random()}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`rounded px-3 py-2 mb-2 max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-700 self-start"
              }`}
            >
              {msg.content}
            </div>
            <small className="text-gray-500 text-xs">
              {new Date(msg.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          className="border flex-grow rounded p-2"
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
