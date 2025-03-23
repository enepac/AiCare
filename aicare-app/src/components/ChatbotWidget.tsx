"use client";

import { useState } from "react";

export default function ChatbotWidget() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { id: messages.length + 1, sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate bot response (replace with API later)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          sender: "bot",
          text: "I'm analyzing your symptoms..."
        }
      ]);
    }, 1000);
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Chatbot</h2>

      {/* Chat Window */}
      <div className="h-48 overflow-y-auto border border-gray-300 p-4 bg-gray-100 rounded-lg mb-4">
        {messages.map((msg) => (
          <p
            key={msg.id}
            className={`p-3 my-1 rounded-md max-w-xs ${
              msg.sender === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            {msg.text}
          </p>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Send
        </button>
      </div>
    </section>
  );
}
