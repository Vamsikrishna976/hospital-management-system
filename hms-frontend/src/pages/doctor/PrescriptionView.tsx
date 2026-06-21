import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "axios";

export default function PrescriptionView() {
  const location = useLocation();

  const prescriptionId = location.state?.prescriptionId;

  const [prescription, setPrescription] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!prescriptionId) {
      navigate("/doctor/dashboard");
      return;
    }
    fetchPrescription();
  }, []);

  const fetchPrescription = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/prescriptions/${prescriptionId}`,
      );
      console.log("Prescription ID:", prescriptionId);

      setPrescription(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // if (!prescriptionId) {
  //   return <div className="p-10">No Prescription Selected</div>;
  // }

  // if (!prescription) {
  //   return <div>Loading...</div>;
  // }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-8 bg-white">
        {/* Hospital Header */}
        <div className="text-center border-b-2 border-gray-300 pb-6 mb-8">
          <h1 className="text-5xl font-extrabold tracking-wide">
            SRI KAVYA KRISHNA
          </h1>

          <h2 className="text-3xl font-bold">SUPER SPECIALITY HOSPITAL</h2>

          <p className="mt-3 text-gray-700">
            General Medicine • Cardiology • Pediatrics • Orthopedics
          </p>

          <p className="text-gray-600">Bangalore, Karnataka | +91 9876543210</p>

          <p className="text-gray-600">info@skkhospital.com</p>
        </div>

        {/* Prescription Title */}
        <div id="prescription">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">PRESCRIPTION</h2>

            <p>
              <strong>Prescription ID:</strong> {prescription.id.slice(0, 8)}
            </p>
            <p>Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Patient Details */}
        <div className="border rounded p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Patient:</strong>{" "}
              {prescription.appointment.opRecord.patient.fullName}
            </p>

            <p>
              <strong>Mobile:</strong>{" "}
              {prescription.appointment.opRecord.patient.mobile}
            </p>

            <p>
              <strong>OP Number:</strong>{" "}
              {prescription.appointment.opRecord.opNumber}
            </p>

            <p>
              <strong>Age:</strong>{" "}
              {prescription.appointment.opRecord.patient.age}
            </p>

            <p>
              <strong>Gender:</strong>{" "}
              {prescription.appointment.opRecord.patient.gender}
            </p>
          </div>
        </div>

        {/* Doctor Details */}
        <div className="border rounded p-4 mb-6">
          <p>
            <strong>Doctor:</strong> {prescription.appointment.doctor.name}
          </p>

          <p>{prescription.appointment.doctor.qualification}</p>

          <p>
            <strong>Department:</strong>{" "}
            {prescription.appointment.doctor.department}
          </p>
        </div>

        {/* Diagnosis */}
        <div className="mb-6">
          <h3 className="font-bold text-xl mb-2">Diagnosis</h3>

          <p>{prescription.diagnosis}</p>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <h3 className="font-bold text-xl mb-2">Notes</h3>

          <p>{prescription.notes}</p>
        </div>

        {/* Medicines */}
        <div className="mb-8">
          <h3 className="font-bold text-xl mb-3">Medicines</h3>

          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2">#</th>

                <th className="border border-gray-400 p-2">Medicine</th>

                <th className="border border-gray-400 p-2">Dosage</th>

                <th className="border border-gray-400 p-2">Frequency</th>

                <th className="border border-gray-400 p-2">Duration</th>
              </tr>
            </thead>

            <tbody>
              {prescription.medicines.map((medicine: any, index: number) => (
                <tr key={medicine.id}>
                  <td className="border border-gray-400 p-2">{index + 1}</td>

                  <td className="border border-gray-400 p-2">
                    {medicine.medicineName}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {medicine.dosage}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {medicine.frequency}
                  </td>

                  <td className="border border-gray-400 p-2">
                    {medicine.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Follow Up */}
        <div className="signature-section mt-8 flex justify-between">
          <div>
            <h3 className="font-bold">Follow Up Date</h3>

            <p>
              {prescription.followUpDate
                ? new Date(prescription.followUpDate).toLocaleDateString()
                : "Not Required"}
            </p>
          </div>

          {/* Signature */}

          <div className="text-center">
            <div className="w-56 border-t mb-2"></div>

            <p>{prescription.appointment.doctor.name}</p>

            <p className="text-sm">Consulting Doctor</p>
          </div>
        </div>

        {/* Print Button */}
        <div className="mt-8 flex gap-6 print:hidden ">
          <button
            onClick={() => window.print()}
            className="bg-green-600  hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium shadow"
          >
            🖨️ Print Prescription
          </button>

          <button
            onClick={() =>
              navigate("/billing", {
                state: {
                  opRecordId: prescription.appointment.opRecord.id,
                },
              })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 p-6 py-3 rounded-lg font-medium shadow"
          >
            💳 Proceed to Billing
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
