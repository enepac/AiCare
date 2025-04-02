"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

type Appointment = {
  _id?: string;
  userEmail?: string;
  type: string;
  location: string;
  purpose?: string;
  appointmentDate: string;
  appointmentTime?: string;
  reminder?: {
    enabled: boolean;
    notifyAt?: string[];
  };
  notes?: string;
  fileUrl?: string;
  fileName?: string;
  status: "upcoming" | "canceled" | "completed";
};

export default function Appointments() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewer, setIsViewer] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<Appointment>>({
    type: "",
    location: "",
    appointmentDate: format(new Date(), "yyyy-MM-dd"),
    status: "upcoming",
    reminder: { enabled: false, notifyAt: [] }
  });

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/patient-data/appointments");
      const data = await res.json();
      setAppointments(data);

      if (data.length > 0 && session?.user?.email && data[0].userEmail !== session.user.email) {
        setIsViewer(true);
      }
    } catch (err) {
      console.error("❌ Failed to load appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [session]);

  const handleFormChange = (
    field: keyof Appointment,
    value: string | boolean | string[] | { enabled: boolean; notifyAt?: string[] } | undefined
  ) => {
    if (isViewer) return;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (isViewer) return;

    const isEdit = !!form._id;
    const res = await fetch("/api/patient-data/appointments", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      setModalOpen(false);
      fetchAppointments();
      setForm({
        type: "",
        location: "",
        appointmentDate: format(new Date(), "yyyy-MM-dd"),
        status: "upcoming",
        reminder: { enabled: false, notifyAt: [] }
      });
    }
  };

  const handleDelete = async (_id: string) => {
    if (isViewer) return;

    const res = await fetch(`/api/patient-data/appointments?id=${_id}`, {
      method: "DELETE"
    });
    if (res.ok) fetchAppointments();
  };
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
        {!isViewer && (
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add Appointment
          </button>
        )}
      </div>

      {isViewer && (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded text-sm">
          👁️ You are viewing shared appointments. Editing is disabled.
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt._id}
              className="p-4 border rounded shadow-sm bg-white flex flex-col md:flex-row justify-between items-start gap-4"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {appt.type} <span className="text-sm text-gray-500">({appt.location})</span>
                </p>
                <p className="text-sm text-gray-600">
                  {format(new Date(appt.appointmentDate), "PPP")}{" "}
                  {appt.appointmentTime && `at ${appt.appointmentTime}`}
                </p>
                {appt.notes && <p className="text-sm text-gray-500 mt-1">{appt.notes}</p>}
                <span
                  className={`text-xs mt-1 px-2 py-1 rounded ${
                    appt.status === "upcoming"
                      ? "bg-blue-100 text-blue-700"
                      : appt.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {appt.status}
                </span>
              </div>

              {!isViewer && (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setForm(appt);
                      setModalOpen(true);
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => appt._id && handleDelete(appt._id)}
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

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold">
              {form._id ? "Edit Appointment" : "Add Appointment"}
            </h3>

            <input
              type="text"
              placeholder="Type (e.g. Consultation)"
              value={form.type ?? ""}
              onChange={(e) => handleFormChange("type", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            />

            <input
              type="text"
              placeholder="Location"
              value={form.location ?? ""}
              onChange={(e) => handleFormChange("location", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            />

            <input
              type="text"
              placeholder="Purpose (optional)"
              value={form.purpose ?? ""}
              onChange={(e) => handleFormChange("purpose", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            />

            <div className="flex gap-2">
              <input
                type="date"
                value={form.appointmentDate ?? ""}
                onChange={(e) => handleFormChange("appointmentDate", e.target.value)}
                className="border p-2 rounded w-1/2"
                disabled={isViewer}
              />
              <input
                type="time"
                value={form.appointmentTime ?? ""}
                onChange={(e) => handleFormChange("appointmentTime", e.target.value)}
                className="border p-2 rounded w-1/2"
                disabled={isViewer}
              />
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.reminder?.enabled ?? false}
                onChange={() =>
                  handleFormChange("reminder", {
                    enabled: !form.reminder?.enabled,
                    notifyAt: form.reminder?.enabled ? [] : [new Date().toISOString()]
                  })
                }
                disabled={isViewer}
              />
              Enable Reminder
            </label>

            <textarea
              placeholder="Notes (optional)"
              value={form.notes ?? ""}
              onChange={(e) => handleFormChange("notes", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            />

            <select
              value={form.status}
              onChange={(e) => handleFormChange("status", e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            >
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setForm({
                    type: "",
                    location: "",
                    appointmentDate: format(new Date(), "yyyy-MM-dd"),
                    status: "upcoming",
                    reminder: { enabled: false, notifyAt: [] }
                  });
                }}
                className="px-4 py-2 border rounded"
              >
                Close
              </button>

              {!isViewer && (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
