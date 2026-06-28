import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import axios from "axios";

export default function IPDManagement() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [beds, setBeds] = useState<any[]>([]);

  const [form, setForm] = useState({
    patientId: "",
    bedId: "",
  });

  useEffect(() => {
    loadStats();
    loadPatients();
    loadAdmissions();
    loadBeds();
  }, []);

  const loadStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ipd/stats");

      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");

      setPatients(res.data?.data ?? []);
    } catch (err) {
      console.error(err);
    }
  };

  const admitPatient = async () => {
    try {
      await axios.post("http://localhost:5000/api/ipd/admit", form);

      alert("Patient admitted successfully");

      loadStats();

      loadPatients();

      loadBeds();
    } catch (err) {
      console.error(err);
    }
  };

  const loadAdmissions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/ipd");
      setAdmissions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generateBill = async (admissionId: string) => {
    try {
      await axios.post("http://localhost:5000/api/ipd-billing/generate", {
        admissionId,
      });

      alert("Bill generated successfully");

      loadAdmissions();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to generate bill");
    }
  };

  const dischargePatient = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/ipd/discharge/${id}`);

      alert("Patient discharged successfully");

      loadAdmissions();
      loadStats();
    } catch (err) {
      console.error(err);
    }
  };

  const loadBeds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/beds/available");
      setBeds(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const primaryButton =
    "w-28 h-10 rounded-md text-sm font-semibold text-white transition";

  const disabledButton =
    "w-28 h-10 rounded-md text-sm font-semibold bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">IPD Management</h1>

        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Admit Patient</h2>

          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.patientId}
              onChange={(e) =>
                setForm({
                  ...form,
                  patientId: e.target.value,
                })
              }
              className="border rounded p-2"
            >
              <option value="">Select Patient</option>

              {patients.map((e: any) => (
                <option key={e.id} value={e.id}>
                  {e.fullName}
                </option>
              ))}
            </select>

            <select
              value={form.bedId}
              onChange={(e) =>
                setForm({
                  ...form,
                  bedId: e.target.value,
                })
              }
              className="border rounded p-2"
            >
              <option value="">Select Bed</option>

              {beds.map((bed: any) => (
                <option key={bed.id} value={bed.id}>
                  {bed.ward} | Room {bed.roomNumber} | Bed {bed.bedNumber}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={admitPatient}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
          >
            Admit Patient
          </button>
        </div>

        {!stats ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="rounded-xl shadow bg-white p-6">
              <h3>Total Admissions</h3>

              <p className="text-3xl font-bold">{stats.totalAdmissions}</p>
            </div>

            <div className="rounded-xl shadow bg-white p-6">
              <h3>Currently Admitted</h3>

              <p className="text-3xl font-bold text-green-600">
                {stats.admittedPatients}
              </p>
            </div>

            <div className="rounded-xl shadow bg-white p-6">
              <h3>Discharged</h3>

              <p className="text-3xl font-bold text-blue-600">
                {stats.dischargedPatients}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 mt-8">
          <h2 className="text-xl font-bold mb-4">Current Admissions</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3">Patient</th>
                <th className="border p-3">Ward</th>
                <th className="border p-3">Room</th>
                <th className="border p-3">Bed</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Admitted Date</th>
                <th className="border p-3 w-48">Bill Status</th>
                <th className="border p-3 w-[300px] text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {admissions.map((admission: any) => (
                <tr
                  key={admission.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border p-2">{admission.patient?.fullName}</td>

                  <td className="border p-2">{admission.bed?.ward || "-"}</td>

                  <td className="border p-2">
                    {admission.bed?.roomNumber || "-"}
                  </td>

                  <td className="border p-2">
                    {admission.bed?.bedNumber || "-"}
                  </td>

                  <td className="border p-2">{admission.status}</td>

                  <td className="border p-2">
                    {new Date(admission.admittedDate).toLocaleDateString()}
                  </td>

                  <td className="border p-3 text-center">
                    {admission.bill ? (
                      <span className="inline-flex items-center justify-center min-w-[130px] rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        ✓ Generated
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center min-w-[130px] rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                        ✕ Not Generated
                      </span>
                    )}
                  </td>
                  <td className="border p-3 align-middle">
                    <div className="flex flex-col items-center">
                      {/* Buttons */}
                      <div className="flex justify-center items-center gap-2">
                        {!admission.bill ? (
                          <button
                            onClick={() => generateBill(admission.id)}
                            className={`${primaryButton} bg-blue-600 hover:bg-blue-700`}
                          >
                            Generate Bill
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              navigate(
                                `/ipd-billing?admissionId=${admission.id}`,
                              )
                            }
                            className={`${primaryButton} bg-violet-600 hover:bg-violet-700`}
                          >
                            View Bill
                          </button>
                        )}

                        {admission.status === "ADMITTED" ? (
                          <button
                            onClick={() => dischargePatient(admission.id)}
                            disabled={
                              !admission.bill ||
                              admission.bill.paymentStatus !== "PAID"
                            }
                            className={
                              !admission.bill ||
                              admission.bill.paymentStatus !== "PAID"
                                ? disabledButton
                                : `${primaryButton} bg-red-600 hover:bg-red-700`
                            }
                          >
                            Discharge
                          </button>
                        ) : (
                          <span className="w-28 h-10 flex items-center justify-center rounded-md bg-green-100 text-green-700 text-sm font-semibold">
                            ✓ Discharged
                          </span>
                        )}
                      </div>

                      {/* Warning */}
                      {admission.status === "ADMITTED" &&
                        (!admission.bill ||
                          admission.bill.paymentStatus !== "PAID") && (
                          <span className="mt-1 text-[11px] text-red-500">
                            Complete billing & payment
                          </span>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
