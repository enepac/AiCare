"use client";

import { useState } from "react";

export default function StopAccessButton({
  viewerEmail,
  onSuccess
}: {
  viewerEmail: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleStop = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/patient-data/revoke-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ viewerEmail })
      });

      if (res.ok) {
        setSuccess(true);
        if (onSuccess) onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to revoke access.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return <span className="text-green-600 text-sm">✅ Access revoked</span>;

  return (
    <div className="space-y-1">
      <button
        onClick={handleStop}
        disabled={loading}
        className="text-sm text-red-600 underline disabled:opacity-50"
      >
        {loading ? "Revoking..." : "Stop Access"}
      </button>
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}
