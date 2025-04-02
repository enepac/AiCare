"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import clsx from "clsx";

type EntryType = "diagnosis" | "allergy" | "immunization" | "other";
type EntryStatus = "active" | "resolved" | "unknown";

interface MedicalHistoryEntry {
  _id?: string;
  userEmail?: string;
  type: EntryType;
  title: string;
  date: string;
  notes?: string;
  status?: EntryStatus;
}

export default function MedicalHistory() {
  const { data: session } = useSession();
  const [entries, setEntries] = useState<MedicalHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewer, setIsViewer] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<MedicalHistoryEntry>>({
    type: "diagnosis",
    status: "active"
  });

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/patient-data/history");
      const data = await res.json();
      setEntries(data);

      // Determine viewer mode using first record
      if (data.length > 0 && session?.user?.email && data[0].userEmail !== session.user.email) {
        setIsViewer(true);
      }
    } catch (err) {
      console.error("❌ Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [session]);

  const handleFormChange = (
    field: keyof MedicalHistoryEntry,
    value: string | Date | EntryType | EntryStatus | undefined
  ) => {
    if (isViewer) return;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (isViewer) return;

    const isEdit = !!form._id;
    const res = await fetch("/api/patient-data/history", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      fetchEntries();
      setModalOpen(false);
      setForm({ type: "diagnosis", status: "active" });
    } else {
      console.error("❌ Failed to save entry");
    }
  };

  const handleDelete = async (id: string) => {
    if (isViewer) return;

    const res = await fetch(`/api/patient-data/history?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchEntries();
  };
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Medical History</h2>

        {!isViewer && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Entry
          </button>
        )}
      </div>

      {isViewer && (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded text-sm">
          👁️ You are viewing shared medical history. Editing is disabled.
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-gray-500">No history found.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry._id}
              className="border p-4 rounded shadow-sm flex justify-between items-start bg-white"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {entry.title} <span className="ml-2 text-xs text-gray-500">({entry.type})</span>
                </p>
                <p className="text-sm text-gray-600">{format(new Date(entry.date), "PPP")}</p>
                {entry.notes && <p className="mt-1 text-sm text-gray-500">{entry.notes}</p>}
                {entry.type === "diagnosis" && (
                  <p
                    className={clsx(
                      "text-xs mt-1 inline-block px-2 py-1 rounded",
                      entry.status === "resolved"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    )}
                  >
                    {entry.status?.toUpperCase()}
                  </p>
                )}
              </div>
              {!isViewer && (
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={() => {
                      setForm(entry);
                      setModalOpen(true);
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => entry._id && handleDelete(entry._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && !isViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold">
              {form._id ? "Edit Entry" : "Add Medical History"}
            </h3>

            <select
              value={form.type}
              onChange={(e) => handleFormChange("type", e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="diagnosis">Diagnosis</option>
              <option value="allergy">Allergy</option>
              <option value="immunization">Immunization</option>
              <option value="other">Other</option>
            </select>

            <input
              type="text"
              placeholder="Title (e.g. Asthma)"
              value={form.title ?? ""}
              onChange={(e) => handleFormChange("title", e.target.value)}
              className="border p-2 rounded w-full"
            />

            <input
              type="date"
              value={form.date ?? ""}
              onChange={(e) => handleFormChange("date", e.target.value)}
              className="border p-2 rounded w-full"
            />

            {form.type === "diagnosis" && (
              <select
                value={form.status}
                onChange={(e) => handleFormChange("status", e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="unknown">Unknown</option>
              </select>
            )}

            <textarea
              placeholder="Notes (optional)"
              value={form.notes ?? ""}
              onChange={(e) => handleFormChange("notes", e.target.value)}
              className="border p-2 rounded w-full"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setForm({ type: "diagnosis", status: "active" });
                }}
                className="text-sm px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
