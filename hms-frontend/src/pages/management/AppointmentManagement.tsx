import { useEffect, useState } from "react";
import axios from "axios";

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const totalAppointments = appointments.length;

  const completedAppointments = appointments.filter(
    (a) => a.status === "COMPLETED",
  ).length;

  const cancelledAppointments = appointments.filter(
    (a) => a.status === "CANCELLED",
  ).length;

  const assignedAppointments = appointments.filter(
    (a) => a.status === "ASSIGNED",
  ).length;

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments",
      );

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const completeAppointment = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/complete/${id}`);

      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const cancelAppointment = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/cancel/${id}`);

      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.appointmentNo.toLowerCase().includes(search.toLowerCase()) ||
      appointment.opRecord.patient.fullName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.doctor.fullName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Appointment Management</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-600 text-white p-4 rounded-xl">
          <p>Total</p>
          <h2 className="text-3xl font-bold">{totalAppointments}</h2>
        </div>

        <div className="bg-orange-500 text-white p-4 rounded-xl">
          <p>Assigned</p>
          <h2 className="text-3xl font-bold">{assignedAppointments}</h2>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-xl">
          <p>Completed</p>
          <h2 className="text-3xl font-bold">{completedAppointments}</h2>
        </div>

        <div className="bg-red-600 text-white p-4 rounded-xl">
          <p>Cancelled</p>
          <h2 className="text-3xl font-bold">{cancelledAppointments}</h2>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search Patient / Doctor / Appointment"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-lg w-full mb-4"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border p-3 rounded-lg mb-4"
      >
        <option value="ALL">All</option>
        <option value="ASSIGNED">Assigned</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Appointment</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Doctor</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{appointment.appointmentNo}</td>

                <td className="p-3">{appointment.opRecord.patient.fullName}</td>

                <td className="p-3">{appointment.doctor.fullName}</td>

                <td className="p-3">{appointment.doctor.specialization}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      appointment.status === "COMPLETED"
                        ? "bg-green-600"
                        : appointment.status === "CANCELLED"
                          ? "bg-red-600"
                          : "bg-orange-500"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => completeAppointment(appointment.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => cancelAppointment(appointment.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
