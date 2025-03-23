"use client";

export default function HealthSummary() {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Health Summary</h2>

      {/* Unified Card Design (Similar to Medication Reminders) */}
      <div className="space-y-4">
        {/* AI Health Insights */}
        <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800">AI Health Insights</h3>
          <p className="text-gray-700 mt-2">You should drink more water today.</p>
        </div>

        {/* Upcoming Appointments */}
        <div className="p-4 bg-green-100 border border-green-300 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-green-800">Upcoming Appointments</h3>
          <p className="text-gray-700 mt-2">Dr. Lisa Brown - March 20, 10:00 AM</p>
        </div>

        {/* Medication Reminders */}
        <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-800">Medication Reminder</h3>
          <p className="text-gray-700 mt-2">Paracetamol (500mg) - 8:00 AM</p>
        </div>
      </div>
    </section>
  );
}
