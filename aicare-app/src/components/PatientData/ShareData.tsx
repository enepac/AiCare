"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type InviteEntry = {
  viewerEmail: string;
  status: "pending" | "accepted";
};

type IncomingRequest = {
  _id: string;
  viewerEmail: string;
  status: "pending" | "accepted";
};

type SharedPatient = {
  _id: string;
  name: string;
  email: string;
  image?: string;
};

export default function ShareData() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { _id: string; name: string; email: string }[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<{
    _id: string;
    name: string;
    email: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isViewer, setIsViewer] = useState(false);
  const [invites, setInvites] = useState<InviteEntry[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>([]);

  const [sharedPatients, setSharedPatients] = useState<SharedPatient[]>([]);
  const [activePatientId, setActivePatientId] = useState<string | null>(null);

  useEffect(() => {
    const tryFetchViewerAccess = async () => {
      if (!session?.user?.email) return;

      const result = await fetch("/api/shared-access/viewable-patients");
      if (result.ok) {
        const shared = await result.json();
        if (Array.isArray(shared) && shared.length > 0) {
          setSharedPatients(shared);

          const saved = localStorage.getItem("activePatientId");
          const found = shared.find((p: SharedPatient) => p._id === saved);

          if (saved && found) {
            setActivePatientId(saved);
            setIsViewer(true);
            localStorage.setItem("viewerEmail", found.email);
          } else {
            setActivePatientId(null);
            setIsViewer(false);
            localStorage.removeItem("viewerEmail");
          }
        }
      }

      fetchInvites();
      fetchIncoming();
    };

    tryFetchViewerAccess();
  }, [session]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchQuery.length < 2) return setSearchResults([]);
      try {
        const res = await fetch(`/api/users/search?query=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (res.ok) {
          setSearchResults(data.users);
        }
      } catch {
        console.error("❌ Failed to search users");
      }
    };

    const debounce = setTimeout(fetchUsers, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const fetchInvites = async () => {
    try {
      const res = await fetch("/api/patient-data/invites");
      if (res.ok) {
        const data = await res.json();
        setInvites(data);
      }
    } catch {
      console.error("❌ Failed to fetch invites");
    }
  };

  const fetchIncoming = async () => {
    try {
      const res = await fetch("/api/patient-data/requests");
      if (res.ok) {
        const data = await res.json();
        setIncomingRequests(data);
      }
    } catch {
      console.error("❌ Failed to fetch incoming requests");
    }
  };

  const handleShare = async () => {
    if (!selectedUser) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/patient-data/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ viewerId: selectedUser._id })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: `✅ Shared with ${selectedUser.name}` });
        setSelectedUser(null);
        fetchInvites();
      } else {
        setMessage({ type: "error", text: data.error || "Something went wrong." });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to share. Try again later." });
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

      if (res.ok && action === "accept") {
        const result = await fetch("/api/shared-access/viewable-patients");
        if (result.ok) {
          const shared = await result.json();
          if (Array.isArray(shared)) {
            setSharedPatients(shared);
          }
        }
      }

      fetchIncoming();
    } catch {
      console.error("❌ Failed to respond to request");
    }
  };

  const revokeShare = async (viewerEmail: string) => {
    try {
      const res = await fetch("/api/patient-data/revoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ viewerEmail })
      });

      if (res.ok) {
        fetchInvites();
        setMessage({ type: "success", text: `Access revoked for ${viewerEmail}` });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to revoke access." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong while revoking access." });
    }
  };

  const handleViewerToggle = (id: string) => {
    if (id === "__self__") {
      localStorage.removeItem("activePatientId");
      localStorage.removeItem("viewerEmail");
      document.cookie = `activePatientId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      setActivePatientId(null);
      setIsViewer(false);
    } else {
      const selected = sharedPatients.find((p) => p._id === id);
      if (selected) {
        localStorage.setItem("activePatientId", id);
        localStorage.setItem("viewerEmail", selected.email);
        document.cookie = `activePatientId=${id}; path=/`;
        setActivePatientId(id);
        setIsViewer(true);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Share Data</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          👤 Who’s data are you viewing?
        </label>
        <select
          className="w-full border rounded p-2 bg-white shadow-sm text-gray-800"
          value={activePatientId ?? "__self__"}
          onChange={(e) => handleViewerToggle(e.target.value)}
        >
          <option value="__self__">👤 Your Own Data</option>
          {sharedPatients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              👤 {patient.name} ({patient.email})
            </option>
          ))}
        </select>
      </div>

      {isViewer ? (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded text-sm">
          👁️ You are viewing shared data. Sharing is only available to the data owner.
        </div>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Share your data with another user
            </label>
            <input
              type="text"
              placeholder="Search users by name or email"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedUser(null);
              }}
              className="w-full border p-2 rounded mb-2"
            />

            {searchResults.length > 0 && !selectedUser && (
              <ul className="bg-white border rounded shadow text-gray-800 max-h-40 overflow-y-auto text-sm">
                {searchResults.map((user) => (
                  <li
                    key={user._id}
                    onClick={() => {
                      setSelectedUser(user);
                      setSearchResults([]);
                      setSearchQuery("");
                    }}
                    className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {user.name} ({user.email})
                  </li>
                ))}
              </ul>
            )}

            {selectedUser && (
              <div className="flex items-center justify-between bg-gray-100 p-2 rounded mb-3">
                <span className="text-sm">
                  {selectedUser.name} ({selectedUser.email})
                </span>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-xs text-red-500 hover:underline ml-2"
                >
                  ✖ Remove
                </button>
              </div>
            )}

            <button
              onClick={handleShare}
              disabled={loading || !selectedUser}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Share with User"}
            </button>

            {message && (
              <p
                className={`mt-2 text-sm ${
                  message.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Your Share Invites</h3>
              <button onClick={fetchInvites} className="text-xs text-blue-600 hover:underline">
                Refresh
              </button>
            </div>

            {invites.length === 0 ? (
              <p className="text-sm text-gray-500">No invites sent yet.</p>
            ) : (
              <ul className="text-sm text-gray-700 space-y-1">
                {invites.map((inv) => (
                  <li key={inv.viewerEmail} className="flex justify-between items-center">
                    <span>{inv.viewerEmail}</span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          inv.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {inv.status}
                      </span>
                      {inv.status === "accepted" && (
                        <button
                          onClick={() => revokeShare(inv.viewerEmail)}
                          className="text-xs text-red-600 hover:underline"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Incoming View Requests</h3>
            {incomingRequests.length === 0 ? (
              <p className="text-sm text-gray-500">No one has requested access.</p>
            ) : (
              <ul className="text-sm text-gray-700 space-y-2">
                {incomingRequests.map((req) => (
                  <li
                    key={req._id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <span>{req.viewerEmail}</span>
                    {req.status === "pending" ? (
                      <div className="space-x-2">
                        <button
                          onClick={() => respondToRequest(req._id, "accept")}
                          className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => respondToRequest(req._id, "reject")}
                          className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-green-600 text-xs">Accepted</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
