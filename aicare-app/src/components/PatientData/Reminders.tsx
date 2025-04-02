"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type ReminderItem = {
  _id: string;
  type: "medication" | "appointment" | "procedure";
  name: string;
  date: string;
  time?: string;
  source: "medications" | "appointments" | "procedures";
};

type Med = {
  _id: string;
  name: string;
  startDate: string;
  userEmail?: string;
  reminder?: { enabled?: boolean; times?: string[] };
};

type Appt = {
  _id: string;
  type: string;
  appointmentDate: string;
  appointmentTime?: string;
  userEmail?: string;
  reminder?: { enabled?: boolean };
};

type Proc = {
  _id: string;
  procedureName: string;
  date: string;
  time?: string;
  userEmail?: string;
  reminder?: { enabled?: boolean };
};

export default function Reminders() {
  const { data: session } = useSession();

  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewer, setIsViewer] = useState(false);

  const fetchReminders = async () => {
    try {
      const [meds, appts, procs]: [Med[], Appt[], Proc[]] = await Promise.all([
        fetch("/api/patient-data/medications").then((res) => res.json()),
        fetch("/api/patient-data/appointments").then((res) => res.json()),
        fetch("/api/patient-data/procedures").then((res) => res.json())
      ]);

      // Detect if viewer
      const ownerEmail = meds[0]?.userEmail || appts[0]?.userEmail || procs[0]?.userEmail;
      if (ownerEmail && session?.user?.email && session.user.email !== ownerEmail) {
        setIsViewer(true);
      }

      const medsReminders = meds
        .filter((m) => m.reminder?.enabled)
        .map((m) => ({
          _id: m._id,
          type: "medication" as const,
          name: m.name,
          date: m.startDate,
          time: m.reminder?.times?.[0] || "",
          source: "medications" as const
        }));

      const apptReminders = appts
        .filter((a) => a.reminder?.enabled)
        .map((a) => ({
          _id: a._id,
          type: "appointment" as const,
          name: a.type,
          date: a.appointmentDate,
          time: a.appointmentTime || "",
          source: "appointments" as const
        }));

      const procReminders = procs
        .filter((p) => p.reminder?.enabled)
        .map((p) => ({
          _id: p._id,
          type: "procedure" as const,
          name: p.procedureName,
          date: p.date,
          time: p.time || "",
          source: "procedures" as const
        }));

      setReminders([...medsReminders, ...apptReminders, ...procReminders]);
    } catch (err) {
      console.error("❌ Failed to load reminders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [session]);

  const disableReminder = async (id: string, source: string) => {
    if (isViewer) return;

    const res = await fetch(`/api/patient-data/${source}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: id,
        reminder: {
          enabled: false,
          notifyAt: []
        }
      })
    });

    if (res.ok) fetchReminders();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800">Reminders</h2>

      {isViewer && (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded text-sm">
          👁️ You are viewing shared reminders. Editing is disabled.
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading reminders...</p>
      ) : reminders.length === 0 ? (
        <p className="text-gray-500">No active reminders found.</p>
      ) : (
        <div className="space-y-3">
          {reminders
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((rem) => (
              <div
                key={rem._id}
                className="p-4 border rounded bg-white flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {rem.name} <span className="ml-2 text-xs text-gray-500">({rem.type})</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {rem.date}
                    {rem.time && ` at ${rem.time}`}
                  </p>
                </div>

                {!isViewer && (
                  <button
                    onClick={() => disableReminder(rem._id, rem.source)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Disable
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
