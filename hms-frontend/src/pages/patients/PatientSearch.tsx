import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPatient } from "../../services/patient.service";
import PatientRegister from "./PatientRegister";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function PatientSearch() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    console.log("Searching:", mobile);

    const data = await searchPatient(mobile);
    console.log("API Response:", data);

    if (data.exists) {
      setPatient(data.patient);
      setNotFound(false);
    } else {
      setPatient(null);
      setNotFound(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Patient Search</h1>

        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter Mobile Number"
          className="border p-3 rounded-lg w-80"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        >
          Search
        </button>

        {patient && (
          <div className="mt-6 border rounded p-4 bg-white shadow">
            <h2 className="text-xl font-bold mb-3">Patient Details</h2>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold">{patient.fullName}</h2>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <p>
                  <strong>Mobile:</strong> {patient.mobile}
                </p>

                <p>
                  <strong>Age:</strong> {patient.age}
                </p>

                <p>
                  <strong>Gender:</strong> {patient.gender}
                </p>

                <p>
                  <strong>Patient No:</strong> {patient.patientNumber}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                navigate("/op/new", {
                  state: {
                    patientId: patient.id,
                  },
                })
              }
              className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              Continue OP
            </button>
          </div>
        )}
        {notFound && <PatientRegister />}

        {notFound && (
          <div className="mt-6">Patient not found. Register new patient.</div>
        )}
      </div>
    </DashboardLayout>
  );
}
