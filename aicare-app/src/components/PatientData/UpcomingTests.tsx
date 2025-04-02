"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

type Procedure = {
  _id?: string;
  procedureName: string;
  type?: string;
  location?: string;
  date: string;
  time?: string;
  status: "scheduled" | "completed" | "canceled";
  notes?: string;
  reminder?: {
    enabled: boolean;
    notifyAt?: string[];
  };
  fileUrl?: string;
  fileName?: string;
};

export default function UpcomingTests() {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<Procedure>>({
    procedureName: "",
    date: format(new Date(), "yyyy-MM-dd"),
    status: "scheduled",
    reminder: { enabled: false, notifyAt: [] }
  });

  const fetchProcedures = async () => {
    try {
      const res = await fetch("/api/patient-data/procedures");
      const data = await res.json();
      setProcedures(data);
    } catch (err) {
      console.error("❌ Failed to load procedures:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcedures();
  }, []);

  const handleFormChange = (
    field: keyof Procedure,
    value: string | boolean | string[] | undefined
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    const isEdit = !!form._id;
    const res = await fetch("/api/patient-data/procedures", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setModalOpen(false);
      fetchProcedures();
      setForm({
        procedureName: "",
        date: format(new Date(), "yyyy-MM-dd"),
        status: "scheduled",
        reminder: { enabled: false, notifyAt: [] }
      });
    }
  };

  const handleDelete = async (_id: string) => {
    const res = await fetch(`/api/patient-data/procedures?id=${_id}`, {
      method: "DELETE"
    });
    if (res.ok) fetchProcedures();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Tests & Procedures</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Procedure
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : procedures.length === 0 ? (
        <p className="text-gray-500">No upcoming procedures found.</p>
      ) : (
        <div className="space-y-4">
          {procedures.map((p) => (
            <div
              key={p._id}
              className="p-4 border rounded shadow-sm bg-white flex flex-col md:flex-row justify-between items-start gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {p.procedureName}
                  {p.type && <span className="text-sm text-gray-500 ml-1">({p.type})</span>}
                </p>
                <p className="text-sm text-gray-600">
                  {format(new Date(p.date), "PPP")}
                  {p.time && ` at ${p.time}`}
                </p>
                {p.location && <p className="text-sm text-gray-500">{p.location}</p>}
                {p.notes && <p className="text-sm text-gray-500 mt-1">{p.notes}</p>}
                <span
                  className={`text-xs px-2 py-1 mt-2 inline-block rounded-full ${
                    p.status === "scheduled"
                      ? "bg-blue-100 text-blue-700"
                      : p.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setForm(p);
                    setModalOpen(true);
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => p._id && handleDelete(p._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold">
              {form._id ? "Edit Procedure" : "Add Procedure"}
            </h3>

            <input
              type="text"
              placeholder="Procedure Name"
              value={form.procedureName ?? ""}
              onChange={(e) => handleFormChange("procedureName", e.target.value)}
              className="border p-2 rounded w-full"
            />

            <input
              type="text"
              placeholder="Procedure Type (e.g. MRI)"
              value={form.type ?? ""}
              onChange={(e) => handleFormChange("type", e.target.value)}
              className="border p-2 rounded w-full"
            />

            <input
              type="text"
              placeholder="Location"
              value={form.location ?? ""}
              onChange={(e) => handleFormChange("location", e.target.value)}
              className="border p-2 rounded w-full"
            />

            <div className="flex gap-2">
              <input
                type="date"
                value={form.date ?? ""}
                onChange={(e) => handleFormChange("date", e.target.value)}
                className="border p-2 rounded w-1/2"
              />
              <input
                type="time"
                value={form.time ?? ""}
                onChange={(e) => handleFormChange("time", e.target.value)}
                className="border p-2 rounded w-1/2"
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.reminder?.enabled ?? false}
                onChange={() =>
                  setForm((prev) => ({
                    ...prev,
                    reminder: {
                      enabled: !prev.reminder?.enabled,
                      notifyAt: prev.reminder?.enabled ? [] : [new Date().toISOString()]
                    }
                  }))
                }
              />
              Enable Reminder
            </label>

            <textarea
              placeholder="Notes (optional)"
              value={form.notes ?? ""}
              onChange={(e) => handleFormChange("notes", e.target.value)}
              className="border p-2 rounded w-full"
            />

            <select
              value={form.status}
              onChange={(e) => handleFormChange("status", e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setForm({
                    procedureName: "",
                    date: format(new Date(), "yyyy-MM-dd"),
                    status: "scheduled",
                    reminder: { enabled: false, notifyAt: [] }
                  });
                }}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
