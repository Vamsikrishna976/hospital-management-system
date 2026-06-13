import { useState } from "react";
import { createPatient } from "../../services/patient.service";

export default function PatientRegister() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    age: "",
    gender: "",
    address: "",
  });
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const patient =
      await createPatient(formData);

    alert(`Patient Created: ${patient.patientNumber}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 mt-6"
    >
      <input
        placeholder="Full Name"
        className="border p-3 w-full"
        onChange={(e) =>
          setFormData({
            ...formData,
            fullName: e.target.value,
          })
        }
      />

      <input
        placeholder="Mobile Number"
        className="border p-3 w-full"
        onChange={(e) =>
          setFormData({
            ...formData,
            mobile: e.target.value,
          })
        }
      />

      <input
        placeholder="Age"
        type="number"
        className="border p-3 w-full"
        onChange={(e) =>
          setFormData({
            ...formData,
            age: e.target.value,
          })
        }
      />

      <select
        className="border p-3 w-full"
        onChange={(e) =>
          setFormData({
            ...formData,
            gender: e.target.value,
          })
        }
      >
        <option>Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <textarea
        placeholder="Address"
        className="border p-3 w-full"
        onChange={(e) =>
          setFormData({
            ...formData,
            address: e.target.value,
          })
        }
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Register Patient
      </button>
    </form>
  );
}