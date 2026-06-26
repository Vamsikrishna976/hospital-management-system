import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../lib/api";

export default function NewLabOrder() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [tests, setTests] = useState<any[]>([]);

  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    tests: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const patientRes = await api.get("/patients");
      const doctorRes = await api.get("/doctors");
      const testRes = await api.get("/lab/tests");

      setPatients(patientRes.data.data);
      setDoctors(doctorRes.data);
      setTests(testRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckbox = (id: string) => {
    if (form.tests.includes(id)) {
      setForm({
        ...form,
        tests: form.tests.filter((t) => t !== id),
      });
    } else {
      setForm({
        ...form,
        tests: [...form.tests, id],
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await api.post("/lab/orders", form);

      alert("Lab Order Created Successfully");

      navigate("/laboratory/pending");
    } catch (err) {
      console.error(err);
      alert("Failed to create Lab Order");
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded-xl shadow p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Laboratory Order</h1>

        {/* Patient */}

        <label className="font-semibold">Patient</label>

        <select
          className="w-full border rounded p-3 mb-5"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        >
          <option value="">Select Patient</option>

          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.patientNumber} - {patient.fullName}
            </option>
          ))}
        </select>

        {/* Doctor */}

        <label className="font-semibold">Doctor</label>

        <select
          className="w-full border rounded p-3 mb-5"
          value={form.doctorId}
          onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
        >
          <option value="">Select Doctor</option>

          {doctors.map((doctor: any) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.fullName}
            </option>
          ))}
        </select>

        {/* Tests */}

        <label className="font-semibold block mb-3">Select Tests</label>

        <div className="space-y-3 mb-8">
          {tests.map((test: any) => (
            <label key={test.id} className="flex items-center gap-3">
              <input type="checkbox" onChange={() => handleCheckbox(test.id)} />

              {test.testName}
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Create Lab Order
        </button>
      </div>
    </DashboardLayout>
  );
}
