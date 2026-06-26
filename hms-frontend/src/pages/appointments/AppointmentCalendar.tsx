import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function AppointmentCalendar() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointment-calendar",
      );

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const selectedAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.assignedAt);

    return appointmentDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Appointment Calendar</h1>

        <Calendar
          value={selectedDate}
          onChange={(value) => setSelectedDate(value as Date)}
        />
      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Appointments on {selectedDate.toLocaleDateString()}
        </h2>

        {selectedAppointments.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled.</p>
        ) : (
          <div className="space-y-4">
            {selectedAppointments.map((appointment: any) => (
              <div key={appointment.id} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg">
                  👨‍⚕️ {appointment.doctor.fullName}
                </h3>

                <p>👤 {appointment.opRecord.patient.fullName}</p>

                <p>🏥 OP No: {appointment.opRecord.opNumber}</p>

                <p>
                  ⏰ {new Date(appointment.assignedAt).toLocaleTimeString()}
                </p>

                <p>📌 Status: {appointment.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
