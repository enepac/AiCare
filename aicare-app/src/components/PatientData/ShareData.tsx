"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ShareData() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isViewer, setIsViewer] = useState(false);

  useEffect(() => {
    const checkViewerMode = async () => {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data?.email && session?.user?.email && data.email !== session.user.email) {
        setIsViewer(true);
      }
    };

    checkViewerMode();
  }, [session]);

  const handleShare = async () => {
    if (isViewer || !email.includes("@")) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/patient-data/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: `✅ Invite sent to ${email}` });
        setEmail("");
      } else {
        setMessage({ type: "error", text: data.error || "Something went wrong." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to send invite. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Share Data</h2>

      {isViewer && (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded text-sm">
          👁️ You are viewing shared data. Sharing is only available to the data owner.
        </div>
      )}

      <p className="text-sm text-gray-500">
        Enter the email address of the relative you want to share your AiCare records with.
      </p>

      <input
        type="email"
        placeholder="Relative's email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isViewer}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handleShare}
        disabled={isViewer || loading || !email.includes("@")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Invite"}
      </button>

      {message && (
        <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
