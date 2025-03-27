import ThreadListSidebar from "@/components/chatbot/ThreadListSidebar";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function ChatbotPage() {
  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <ThreadListSidebar />

      {/* Main Chat Interface */}
      <div className="flex-1">
        <ChatbotWidget />
      </div>
    </div>
  );
}
