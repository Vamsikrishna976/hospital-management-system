import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Complaint() {
  const location = useLocation();
  const navigate = useNavigate();

  const opRecordId = location.state?.opRecordId;

  const [formData, setFormData] = useState({
    chiefComplaint: "",
    symptoms: "",
    duration: "",
    previousMedication: "",
    clinicalNotes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/complaints", {
        opRecordId,
        ...formData,
      });

      alert("Complaint Saved");
      navigate("/management/assign", {
        state: {
          opRecordId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Complaint Entry</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Chief Complaint"
          className="border p-3 w-full"
          onChange={(e) =>
            setFormData({
              ...formData,
              chiefComplaint: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Symptoms"
          className="border p-3 w-full"
          onChange={(e) =>
            setFormData({
              ...formData,
              symptoms: e.target.value,
            })
          }
        />

        <input
          placeholder="Duration"
          className="border p-3 w-full"
          onChange={(e) =>
            setFormData({
              ...formData,
              duration: e.target.value,
            })
          }
        />

        <input
          placeholder="Previous Medication"
          className="border p-3 w-full"
          onChange={(e) =>
            setFormData({
              ...formData,
              previousMedication: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Clinical Notes"
          className="border p-3 w-full"
          onChange={(e) =>
            setFormData({
              ...formData,
              clinicalNotes: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Save Complaint
        </button>
      </form>
    </div>
  );
}
