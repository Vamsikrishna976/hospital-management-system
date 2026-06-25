import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "axios";

export default function MedicineEntry() {
  const location = useLocation();
  console.log(location.state);
  const navigate = useNavigate();

  const prescriptionId = location.state?.prescriptionId;
  
  const [medicines, setMedicines] = useState([
    {
      medicineName: "",
      dosage: "",
      frequency: "",
      duration: "",
    },
  ]);
  console.log("Medicine State:", location.state);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...medicines];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setMedicines(updated);
  };

  const addMedicineRow = () => {
    setMedicines([
      ...medicines,
      {
        medicineName: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      for (const medicine of medicines) {
        await axios.post("http://localhost:5000/api/medicines", {
          prescriptionId,
          ...medicine,
        });
      }

      alert("All Medicines Added");

      navigate("/doctor/dashboard", {
        state: {
          prescriptionId,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Failed to add medicines");
    }
  };

  return (
    <DashboardLayout>
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Medicines</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {medicines.map((medicine, index) => (
          <div key={index} className="border p-4 rounded space-y-3">
            <input
              placeholder="Medicine Name"
              className="border p-3 w-full"
              value={medicine.medicineName}
              onChange={(e) =>
                handleChange(index, "medicineName", e.target.value)
              }
            />

            <input
              placeholder="Dosage"
              className="border p-3 w-full"
              value={medicine.dosage}
              onChange={(e) => handleChange(index, "dosage", e.target.value)}
            />

            <input
              placeholder="Frequency"
              className="border p-3 w-full"
              value={medicine.frequency}
              onChange={(e) => handleChange(index, "frequency", e.target.value)}
            />

            <input
              placeholder="Duration"
              className="border p-3 w-full"
              value={medicine.duration}
              onChange={(e) => handleChange(index, "duration", e.target.value)}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addMedicineRow}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          + Add Another Medicine
        </button>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded ml-4"
        >
          Save Prescription
        </button>
      </form>
    </div>
    </DashboardLayout>
  );
}
