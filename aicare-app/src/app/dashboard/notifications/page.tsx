"use client";

import { useEffect, useState } from "react";

type ShareRequest = {
  _id: string;
  ownerName: string;
  ownerEmail: string;
  status: "pending" | "accepted" | "rejected";
};

export default function NotificationsPage() {
  const [requests, setRequests] = useState<ShareRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/patient-data/requests");
      const data = await res.json();
      setRequests(data);
    } catch {
      console.error("❌ Failed to fetch share requests");
    } finally {
      setLoading(false);
    }
  };

  const respondToRequest = async (id: string, action: "accept" | "reject") => {
    try {
      const res = await fetch("/api/patient-data/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action })
      });

      if (res.ok) {
        fetchRequests();
      }
    } catch {
      console.error("❌ Failed to respond to share request");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Notifications</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">You have no pending share requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="border p-4 rounded bg-white shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-700">
                  {req.ownerName} ({req.ownerEmail})
                </p>
                <p className="text-sm text-gray-500">wants to share their medical data with you.</p>
              </div>

              {req.status === "pending" ? (
                <div className="space-x-2">
                  <button
                    onClick={() => respondToRequest(req._id, "accept")}
                    className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => respondToRequest(req._id, "reject")}
                    className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span className="text-green-700 text-sm font-medium">Accepted</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
