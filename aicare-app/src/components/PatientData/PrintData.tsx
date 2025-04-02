"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface SectionToggle {
  profile: boolean;
  medications: boolean;
  testResults: boolean;
  appointments: boolean;
  procedures: boolean;
}

type ProfileData = {
  name: string;
  email?: string;
  age: number;
  gender: string;
  bloodType?: string;
  height?: number;
  weight?: number;
};

type BasicEntry = {
  _id: string;
  [key: string]: string | number | undefined;
};

export default function PrintData() {
  const { data: session } = useSession();

  const [sections, setSections] = useState<SectionToggle>({
    profile: true,
    medications: true,
    testResults: true,
    appointments: true,
    procedures: true
  });

  const [loading, setLoading] = useState(true);
  const [isViewer, setIsViewer] = useState(false);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [medications, setMedications] = useState<BasicEntry[]>([]);
  const [tests, setTests] = useState<BasicEntry[]>([]);
  const [appointments, setAppointments] = useState<BasicEntry[]>([]);
  const [procedures, setProcedures] = useState<BasicEntry[]>([]);

  const fetchAllData = async () => {
    try {
      const [p, m, t, a, pr] = await Promise.all([
        fetch("/api/profile").then((res) => res.json()),
        fetch("/api/patient-data/medications").then((res) => res.json()),
        fetch("/api/patient-data/tests").then((res) => res.json()),
        fetch("/api/patient-data/appointments").then((res) => res.json()),
        fetch("/api/patient-data/procedures").then((res) => res.json())
      ]);

      setProfile(p);
      setMedications(m);
      setTests(t);
      setAppointments(a);
      setProcedures(pr);

      if (session?.user?.email && p.email && session.user.email !== p.email) {
        setIsViewer(true);
      }
    } catch (err) {
      console.error("❌ Failed to load print data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [session]);

  const handleToggle = (key: keyof SectionToggle) => {
    if (isViewer) return;
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <div className="space-y-6 max-w-4xl mx-auto print:max-w-full">
      <div className="flex justify-between items-center print:hidden">
        <h2 className="text-xl font-semibold text-gray-800">Print Data</h2>
        {!isViewer && (
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print
          </button>
        )}
      </div>

      {isViewer && (
        <div className="bg-blue-100 border border-blue-300 text-blue-700 p-3 rounded text-sm print:hidden">
          👁️ You are viewing shared print data. Printing and section toggling is disabled.
        </div>
      )}

      <div className="print:hidden">
        <p className="text-sm text-gray-500 mb-2">Select sections to include:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(sections).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleToggle(key as keyof SectionToggle)}
                disabled={isViewer}
              />
              <span className="capitalize">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {sections.profile && profile && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-1 mb-2">Patient Profile</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  <strong>Name:</strong> {profile.name}
                </li>
                <li>
                  <strong>Age:</strong> {profile.age}
                </li>
                <li>
                  <strong>Gender:</strong> {profile.gender}
                </li>
                <li>
                  <strong>Blood Type:</strong> {profile.bloodType}
                </li>
                <li>
                  <strong>Height:</strong> {profile.height} cm
                </li>
                <li>
                  <strong>Weight:</strong> {profile.weight} kg
                </li>
              </ul>
            </div>
          )}

          {sections.medications && medications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-1 mt-6 mb-2">Medications</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {medications.map((m) => (
                  <li key={m._id}>
                    {m.name} ({m.dosageAmount}
                    {m.dosageUnit}) – {m.frequency}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sections.testResults && tests.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-1 mt-6 mb-2">Test Results</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {tests.map((t) => (
                  <li key={t._id}>
                    {t.testName}: {t.value} {t.unit} (Ref: {t.referenceRange}) – {t.interpretation}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sections.appointments && appointments.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-1 mt-6 mb-2">Appointments</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {appointments.map((a) => (
                  <li key={a._id}>
                    {a.type} on {a.appointmentDate}
                    {a.appointmentTime && ` at ${a.appointmentTime}`}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sections.procedures && procedures.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-1 mt-6 mb-2">Upcoming Procedures</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                {procedures.map((p) => (
                  <li key={p._id}>
                    {p.procedureName} ({p.type}) – {p.date}
                    {p.time && ` at ${p.time}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
