"use client";

export default function AppointmentList() {
  // Sample appointment data (Replace with API data in the future)
  const appointments = [
    { id: 1, doctor: "Dr. Lisa Brown", date: "March 20", time: "10:00 AM" },
    { id: 2, doctor: "Dr. John Smith", date: "April 2", time: "2:00 PM" },
    { id: 3, doctor: "Dr. Emily Davis", date: "April 10", time: "4:30 PM" }
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Appointments</h2>

      <ul className="space-y-4">
        {appointments.map((appointment) => (
          <li
            key={appointment.id}
            className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
          >
            <p className="text-lg font-semibold text-gray-900">{appointment.doctor}</p>
            <p className="text-gray-700">
              {appointment.date} at {appointment.time}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
