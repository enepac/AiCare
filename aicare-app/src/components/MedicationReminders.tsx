"use client";

export default function MedicationReminders() {
  // Sample medication reminders (this will later be fetched from an API)
  const reminders = [
    {
      id: 1,
      name: "Paracetamol",
      dosage: "500mg",
      time: "8:00 AM",
      status: "Taken"
    },
    {
      id: 2,
      name: "Ibuprofen",
      dosage: "200mg",
      time: "6:00 PM",
      status: "Missed"
    },
    {
      id: 3,
      name: "Metformin",
      dosage: "850mg",
      time: "9:00 PM",
      status: "Taken"
    }
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Medication Reminders</h2>

      <ul className="space-y-4">
        {reminders.map((med) => (
          <li
            key={med.id}
            className={`p-4 rounded-lg shadow-sm flex justify-between items-center border ${
              med.status === "Missed"
                ? "bg-red-100 border-red-300"
                : "bg-green-100 border-green-300"
            } hover:shadow-md transition-shadow duration-300`}
          >
            <div>
              <p className="text-gray-900 font-medium text-lg">
                {med.name} ({med.dosage})
              </p>
              <p className="text-gray-700 text-sm">{med.time}</p>
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-lg ${
                med.status === "Missed" ? "bg-red-500 text-white" : "bg-green-500 text-white"
              }`}
            >
              {med.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
