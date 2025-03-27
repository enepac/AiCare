"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_NEXTAUTH_URL || "http://localhost:4000", {
  path: "/api/socketio"
});

export interface ChatbotWidgetProps {
  threadId?: string;
}

export default function ChatbotWidget({
  threadId = "default-thread"
}: ChatbotWidgetProps): JSX.Element {
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; content: string; timestamp: string }[]
  >([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (threadId) {
      socket.emit("join_thread", threadId);

      socket.on(
        "new_message",
        (message: { sender: "user" | "ai"; content: string; timestamp: string }) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      );

      fetch(`/api/chatbot/threads/${threadId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data.messages));

      return () => {
        socket.emit("leave_thread", threadId);
        socket.off("new_message");
      };
    }
  }, [threadId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await fetch(`/api/chatbot/threads/${threadId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input })
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white rounded px-4">
          Send
        </button>
      </div>
    </div>
  );
}
