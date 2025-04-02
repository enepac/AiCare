"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";

type Medication = {
  _id?: string;
  name: string;
  dosageAmount: number;
  dosageUnit: string;
  frequency: string;
  reminder?: {
    enabled: boolean;
    times?: string[];
  };
  status: "active" | "discontinued";
  startDate: string;
  endDate?: string;
  notes?: string;
  fileUrl?: string;
  fileName?: string;
};

export default function Medications() {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  // const [uploading, setUploading] = useState(false);
  // const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<Partial<Medication>>({
    name: "",
    dosageAmount: 0,
    dosageUnit: "mg",
    frequency: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    status: "active",
    reminder: { enabled: false, times: [] }
  });

  const fetchMedications = async () => {
    try {
      const res = await fetch("/api/patient-data/medications");
      const data = await res.json();
      setMedications(data);
    } catch (err) {
      console.error("❌ Failed to load medications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  const handleFormChange = (
    field: keyof Medication,
    value: string | number | boolean | string[] | undefined
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleReminderToggle = () => {
    setForm((prev) => ({
      ...prev,
      reminder: {
        enabled: !prev.reminder?.enabled,
        times: prev.reminder?.enabled ? [] : ["08:00"]
      }
    }));
  };
  const handleSubmit = async () => {
    const isEdit = !!form._id;
    const res = await fetch("/api/patient-data/medications", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setModalOpen(false);
      fetchMedications();
      setForm({
        name: "",
        dosageAmount: 0,
        dosageUnit: "mg",
        frequency: "",
        startDate: format(new Date(), "yyyy-MM-dd"),
        status: "active",
        reminder: { enabled: false, times: [] }
      });
    }
  };

  const handleDelete = async (_id: string) => {
    const res = await fetch(`/api/patient-data/medications?id=${_id}`, {
      method: "DELETE"
    });
    if (res.ok) fetchMedications();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Medications</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Medication
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : medications.length === 0 ? (
        <p className="text-gray-500">No medications found.</p>
      ) : (
        <div className="space-y-4">
          {medications.map((med) => (
            <div
              key={med._id}
              className="p-4 border rounded shadow-sm bg-white flex flex-col md:flex-row justify-between items-start gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {med.name}{" "}
                  <span className="text-sm text-gray-500">
                    ({med.dosageAmount} {med.dosageUnit}, {med.frequency})
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Started: {format(new Date(med.startDate), "PPP")}
                  {med.endDate && <> | Stopped: {format(new Date(med.endDate), "PPP")}</>}
                </p>
                {med.notes && <p className="text-sm text-gray-500 mt-1">{med.notes}</p>}
                <p className="text-sm mt-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      med.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {med.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setForm(med);
                    setModalOpen(true);
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => med._id && handleDelete(med._id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold mb-2">
              {form._id ? "Edit Medication" : "Add Medication"}
            </h3>

            <input
              type="text"
              placeholder="Medicine Name"
              value={form.name ?? ""}
              onChange={(e) => handleFormChange("name", e.target.value)}
              className="border p-2 rounded w-full"
            />

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Dosage"
                value={form.dosageAmount ?? ""}
                onChange={(e) => handleFormChange("dosageAmount", Number(e.target.value))}
                className="border p-2 rounded w-1/2"
              />
              <input
                type="text"
                placeholder="Unit"
                value={form.dosageUnit ?? ""}
                onChange={(e) => handleFormChange("dosageUnit", e.target.value)}
                className="border p-2 rounded w-1/2"
              />
            </div>

            <input
              type="text"
              placeholder="Frequency (e.g. 2x/day)"
              value={form.frequency ?? ""}
              onChange={(e) => handleFormChange("frequency", e.target.value)}
              className="border p-2 rounded w-full"
            />

            <div className="flex gap-2">
              <input
                type="date"
                value={form.startDate ?? ""}
                onChange={(e) => handleFormChange("startDate", e.target.value)}
                className="border p-2 rounded w-1/2"
              />
              <input
                type="date"
                placeholder="End Date"
                value={form.endDate ?? ""}
                onChange={(e) => handleFormChange("endDate", e.target.value)}
                className="border p-2 rounded w-1/2"
              />
            </div>

            {/* Reminders */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.reminder?.enabled ?? false}
                onChange={handleReminderToggle}
              />
              Enable Reminders
            </label>

            {form.reminder?.enabled && (
              <input
                type="time"
                value={form.reminder.times?.[0] ?? "08:00"}
                onChange={() => {
                  setForm((prev) => ({
                    ...prev,
                    reminder: {
                      enabled: !prev.reminder?.enabled,
                      times: prev.reminder?.enabled ? [] : ["08:00"]
                    }
                  }));
                }}
                className="border p-2 rounded w-full"
              />
            )}

            <textarea
              placeholder="Notes (optional)"
              value={form.notes ?? ""}
              onChange={(e) => handleFormChange("notes", e.target.value)}
              className="border p-2 rounded w-full"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setForm({
                    name: "",
                    dosageAmount: 0,
                    dosageUnit: "mg",
                    frequency: "",
                    startDate: format(new Date(), "yyyy-MM-dd"),
                    status: "active",
                    reminder: { enabled: false, times: [] }
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
