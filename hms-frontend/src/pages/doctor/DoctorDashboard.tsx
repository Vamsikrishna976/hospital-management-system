import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "axios";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<any[]>([]);
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/doctors");

      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/doctor-dashboard/${doctorId}/patients`,
      );

      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      <div className="flex gap-3 mb-6">
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="border p-3 rounded w-full"
        >
          <option value="">Select Doctor</option>

          {doctors.map((doctor: any) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.fullName} ({doctor.doctorCode})
            </option>
          ))}
        </select>

        <button
          onClick={fetchPatients}
          className="bg-blue-600 text-white px-6 rounded"
        >
          Load Patients
        </button>
      </div>

      {patients.map((item: any) => (
        <div key={item.id} className="border p-4 rounded mb-4">
          <h2 className="font-bold">{item.opRecord.patient.fullName}</h2>

          <p>OP: {item.opRecord.opNumber}</p>

          <p>
            Complaint:
            {item.opRecord.complaint?.chiefComplaint}
          </p>

          <button
            onClick={() =>
              navigate("/doctor/consultation", {
                state: {
                  appointmentId: item.id,
                  opRecordId: item.opRecord.id,
                },
              })
            }
            className="bg-green-600 text-white px-4 py-2 rounded mt-3"
          >
            Start Consultation
          </button>
        </div>
      ))}
    </div>
    </DashboardLayout>
  );
}
