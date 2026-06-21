import { useState, useEffect } from "react";
import axios from "axios";

export default function PrescriptionDispense() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/pharmacy/prescriptions",
      );

      setPrescriptions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDispense = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/pharmacy/dispense/${id}`);

      alert("Medicine Dispensed");

      fetchPrescriptions();
    } catch (error) {
      console.error(error);
    }
  };
  console.log(prescriptions);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pending Prescriptions</h1>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Diagnosis</th>
              <th className="p-3">Medicines</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {prescriptions.map((prescription) => (
              <tr key={prescription.id} className="border-b">
                <td className="p-3">{prescription.diagnosis}</td>

                <td className="p-3">
                  {prescription.medicines
                    .filter((medicine: any) => medicine.medicineName)
                    .map((medicine: any) => (
                      <div key={medicine.id}>• {medicine.medicineName}</div>
                    ))}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => handleDispense(prescription.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Dispense
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
