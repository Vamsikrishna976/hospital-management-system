import { useState } from "react";
import { useLocation } from "react-router-dom";
import { createOP } from "../../services/op.service";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function NewOP() {
  const location = useLocation();
  const navigate = useNavigate();
  const patientId = location.state?.patientId;
  console.log(patientId);

  const [formData, setFormData] = useState({
    patientId: "",
    bloodPressure: "",
    sugarLevel: "",
    weight: "",
    height: "",
    temperature: "",
    pulseRate: "",
    spo2: "",
  });

  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = (weight: number, height: number) => {
    const bmiValue = weight / Math.pow(height / 100, 2);

    setBmi(Number(bmiValue.toFixed(2)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createOP({
        patientId, // <-- IMPORTANT

        bloodPressure: formData.bloodPressure,
        sugarLevel: Number(formData.sugarLevel),
        weight: Number(formData.weight),
        height: Number(formData.height),
        temperature: Number(formData.temperature),
        pulseRate: Number(formData.pulseRate),
        spo2: Number(formData.spo2),
      });

      navigate("/op/complaint", {
        state: {
          opRecordId: result.id,
          opNumber: result.opNumber,
        },
      });

      console.log(result);
    } catch (error) {
      console.error(error);
      alert("Failed to create OP");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">New OP Entry</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={patientId || ""}
            readOnly
            className="border p-3 w-full rounded bg-gray-100"
          />

          <input
            type="text"
            placeholder="Blood Pressure"
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                bloodPressure: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Sugar Level"
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                sugarLevel: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Weight (kg)"
            className="border p-3 w-full rounded"
            onChange={(e) => {
              const weight = Number(e.target.value);

              setFormData({
                ...formData,
                weight: e.target.value,
              });

              if (formData.height) {
                calculateBMI(weight, Number(formData.height));
              }
            }}
          />

          <input
            type="number"
            placeholder="Height (cm)"
            className="border p-3 w-full rounded"
            onChange={(e) => {
              const height = Number(e.target.value);

              setFormData({
                ...formData,
                height: e.target.value,
              });

              if (formData.weight) {
                calculateBMI(Number(formData.weight), height);
              }
            }}
          />

          {bmi && <div className="bg-blue-100 p-3 rounded">BMI: {bmi}</div>}

          <input
            type="number"
            placeholder="Temperature"
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                temperature: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Pulse Rate"
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                pulseRate: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="SpO₂"
            className="border p-3 w-full rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                spo2: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Create OP
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
