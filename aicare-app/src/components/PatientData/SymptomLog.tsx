"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isToday
} from "date-fns";
import clsx from "clsx";

type SymptomLogEntry = {
  _id?: string;
  userEmail?: string;
  date: string;
  symptoms: string[];
  notes?: string;
};

export default function SymptomLog() {
  const { data: session } = useSession();

  const [logs, setLogs] = useState<SymptomLogEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formSymptoms, setFormSymptoms] = useState<string[]>([]);
  const [formNote, setFormNote] = useState("");
  const [isViewer, setIsViewer] = useState(false);

  const today = new Date();
  const [currentMonth] = useState(today);

  const fetchLogs = async () => {
    try {
      const res = await fetch("/api/patient-data/symptoms");
      const data = await res.json();
      setLogs(data);

      if (data.length > 0 && session?.user?.email && data[0].userEmail !== session.user.email) {
        setIsViewer(true);
      }
    } catch (err) {
      console.error("❌ Error fetching symptom logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [session]);

  const openModalForDate = (date: Date) => {
    if (isViewer) return;

    const iso = format(date, "yyyy-MM-dd");
    const existing = logs.find((entry) => entry.date === iso);
    setSelectedDate(iso);
    setFormSymptoms(existing?.symptoms || []);
    setFormNote(existing?.notes || "");
    setModalOpen(true);
  };

  const generateCalendar = () => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    const rows = [];

    let date = start;
    while (date <= end) {
      const days = [];
      for (let i = 0; i < 7; i++) {
        const iso = format(date, "yyyy-MM-dd");
        const hasEntry = logs.some((log) => log.date === iso);
        days.push(
          <td key={iso}>
            <button
              onClick={() => openModalForDate(date)}
              className={clsx(
                "w-10 h-10 rounded-full text-sm",
                isToday(date) && "border border-blue-500",
                hasEntry ? "bg-blue-100" : "hover:bg-gray-100",
                isViewer && "cursor-not-allowed opacity-50"
              )}
              disabled={isViewer}
            >
              {date.getDate()}
            </button>
          </td>
        );
        date = addDays(date, 1);
      }
      rows.push(<tr key={date.toString()}>{days}</tr>);
    }

    return rows;
  };

  const handleSave = async () => {
    if (isViewer || !selectedDate) return;

    const res = await fetch("/api/patient-data/symptoms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        symptoms: formSymptoms,
        notes: formNote
      })
    });

    if (res.ok) {
      setModalOpen(false);
      setSelectedDate(null);
      setFormSymptoms([]);
      setFormNote("");
      fetchLogs();
    }
  };

  const handleDelete = async () => {
    if (isViewer || !selectedDate) return;

    const log = logs.find((l) => l.date === selectedDate);
    if (!log?._id) return;

    const res = await fetch(`/api/patient-data/symptoms?id=${log._id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      setModalOpen(false);
      setSelectedDate(null);
      setFormSymptoms([]);
      setFormNote("");
      fetchLogs();
    }
  };

  const symptomOptions = ["Fever", "Cough", "Headache", "Fatigue", "Nausea", "Shortness of breath"];
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold">Symptom Log</h2>

      {isViewer && (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded text-sm">
          👁️ You are viewing a shared symptom log. Editing is disabled.
        </div>
      )}

      <table className="w-full text-center border">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2">Sun</th>
            <th className="p-2">Mon</th>
            <th className="p-2">Tue</th>
            <th className="p-2">Wed</th>
            <th className="p-2">Thu</th>
            <th className="p-2">Fri</th>
            <th className="p-2">Sat</th>
          </tr>
        </thead>
        <tbody>{generateCalendar()}</tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold mb-2">
              {selectedDate && format(new Date(selectedDate), "PPP")}
            </h3>

            <div className="flex flex-wrap gap-2">
              {symptomOptions.map((symptom: string) => (
                <button
                  key={symptom}
                  onClick={() => {
                    if (!isViewer && !formSymptoms.includes(symptom)) {
                      setFormSymptoms([...formSymptoms, symptom]);
                    }
                  }}
                  className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                  disabled={isViewer}
                >
                  {symptom}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Add custom symptom..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isViewer) {
                  e.preventDefault();
                  const value = e.currentTarget.value.trim();
                  if (value && !formSymptoms.includes(value)) {
                    setFormSymptoms([...formSymptoms, value]);
                    e.currentTarget.value = "";
                  }
                }
              }}
              disabled={isViewer}
              className="border p-2 rounded w-full"
            />

            <div className="flex flex-wrap gap-2">
              {formSymptoms.map((symptom) => (
                <span key={symptom} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  {symptom}
                </span>
              ))}
            </div>

            <textarea
              placeholder="Notes (optional)"
              value={formNote}
              onChange={(e) => !isViewer && setFormNote(e.target.value)}
              className="border p-2 rounded w-full"
              disabled={isViewer}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setFormSymptoms([]);
                  setFormNote("");
                }}
                className="text-sm px-4 py-2 rounded border"
              >
                Close
              </button>

              {!isViewer && logs.find((l) => l.date === selectedDate)?._id && (
                <button
                  onClick={handleDelete}
                  className="text-sm px-4 py-2 text-red-600 hover:underline"
                >
                  Delete
                </button>
              )}

              {!isViewer && (
                <button
                  onClick={handleSave}
                  className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
