import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function PatientHistory() {
  const [mobile, setMobile] = useState("");
  const [patient, setPatient] = useState<any>(null);

  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/history/${mobile}`,
      );

      setPatient(response.data);
    } catch (error) {
      alert("Patient not found");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-6">Patient History</h1>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="border p-3 rounded w-80"
          />

          <button
            onClick={fetchHistory}
            className="bg-blue-600 text-white px-6 rounded"
          >
            Search
          </button>
        </div>

        {!patient && (
          <div className="text-center text-gray-500 mt-20">
            Search a patient to view history
          </div>
        )}

        {patient && (
          <>
            {/* Patient Details */}
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-4">{patient.fullName}</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <p>
                  <strong>Mobile:</strong> {patient.mobile}
                </p>

                <p>
                  <strong>Patient No:</strong> {patient.patientNumber}
                </p>

                <p>
                  <strong>Age:</strong> {patient.age}
                </p>

                <p>
                  <strong>Gender:</strong> {patient.gender}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white shadow rounded-lg p-4">
                <p className="text-gray-500">Total Visits</p>

                <p className="text-3xl font-bold">{patient.opRecords.length}</p>
              </div>

              <div className="bg-white shadow rounded-lg p-4">
                <p className="text-gray-500">Last Visit</p>

                <p className="text-xl font-bold">
                  {new Date(
                    [...patient.opRecords].sort(
                      (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime(),
                    )[0]?.createdAt,
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-white shadow rounded-lg p-4">
                <p className="text-gray-500">Patient ID</p>

                <p className="text-xl font-bold">{patient.patientNumber}</p>
              </div>
            </div>

            {/* Visit History */}
            {[...patient.opRecords]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((op: any) => (
                <div
                  key={op.id}
                  className="bg-white shadow-md rounded-lg p-6 mb-6"
                >
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <h3 className="text-2xl font-bold">{op.opNumber}</h3>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                      Completed
                    </span>

                    <span className="text-gray-500">
                      {new Date(op.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <hr className="my-4" />

                  {op.appointment.map((appointment: any) => (
                    <div key={appointment.id}>
                      {/* Doctor */}
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <p>
                          <strong>Doctor:</strong> {appointment.doctor.name}
                        </p>

                        <p>
                          <strong>Department:</strong>{" "}
                          {appointment.doctor.department}
                        </p>
                      </div>

                      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded mb-4">
                        <p className="font-semibold">Chief Complaint</p>

                        <p>{op.complaint?.chiefComplaint || "N/A"}</p>

                        <p className="mt-2 text-sm text-gray-600">
                          Symptoms: {op.complaint?.symptoms || "N/A"}
                        </p>
                      </div>

                      {/* Diagnosis */}
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
                        <p className="font-semibold">Diagnosis</p>

                        <p>{appointment.prescription?.diagnosis}</p>
                      </div>

                      {/* Follow Up */}
                      <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg mb-4">
                        Follow Up:{" "}
                        {appointment.prescription?.followUpDate
                          ? new Date(
                              appointment.prescription.followUpDate,
                            ).toLocaleDateString()
                          : "Not Required"}
                      </div>

                      {/* Medicines */}
                      {appointment.prescription?.medicines?.length > 0 && (
                        <>
                          <h4 className="font-semibold mb-2">
                            Medicines Prescribed (
                            {appointment.prescription.medicines.length})
                          </h4>

                          <table className="w-full border border-gray-300 mb-4">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="border p-2">Medicine</th>

                                <th className="border p-2">Dosage</th>

                                <th className="border p-2">Frequency</th>

                                <th className="border p-2">Duration</th>
                              </tr>
                            </thead>

                            <tbody>
                              {appointment.prescription.medicines.map(
                                (medicine: any) => (
                                  <tr key={medicine.id}>
                                    <td className="border p-2">
                                      {medicine.medicineName}
                                    </td>

                                    <td className="border p-2">
                                      {medicine.dosage}
                                    </td>

                                    <td className="border p-2">
                                      {medicine.frequency}
                                    </td>

                                    <td className="border p-2">
                                      {medicine.duration}
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>

                          {/* Buttons */}
                          <div className="flex gap-3">
                            <button
                              onClick={() =>
                                navigate("/doctor/prescription", {
                                  state: {
                                    prescriptionId: appointment.prescription.id,
                                  },
                                })
                              }
                              className="bg-green-600 text-white px-5 py-2 rounded"
                            >
                              View Prescription
                            </button>

                            <button
                              onClick={() =>
                                navigate("/doctor/prescription", {
                                  state: {
                                    repeatPrescription:
                                      appointment.prescription,
                                  },
                                })
                              }
                              className="bg-purple-600 text-white px-5 py-2 rounded"
                            >
                              Repeat Prescription
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
