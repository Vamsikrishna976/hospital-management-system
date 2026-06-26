import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../lib/api";

export default function UploadLabResult() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [item, setItem] = useState<any>(null);

  const [form, setForm] = useState({
    result: "",
    unit: "",
    referenceRange: "",
    remarks: "",
  });

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const res = await api.get(`/lab/results/${itemId}`);

      setItem(res.data.data);

      setForm({
        result: res.data.data.result || "",
        unit: res.data.data.unit || "",
        referenceRange: res.data.data.referenceRange || "",
        remarks: res.data.data.remarks || "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const uploadResult = async () => {
    try {
      await api.put(`/lab/results/${itemId}`, form);

      alert("Lab Result Uploaded Successfully");

      navigate("/laboratory/reports");
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Upload Laboratory Result
        </h1>

        <div className="space-y-3 mb-8">

          <p>
            <strong>Patient :</strong> {item.order.patient.fullName}
          </p>

          <p>
            <strong>Doctor :</strong> {item.order.doctor.fullName}
          </p>

          <p>
            <strong>Test :</strong> {item.labTest.testName}
          </p>

        </div>

        <div className="space-y-5">

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Result"
            value={form.result}
            onChange={(e) =>
              setForm({
                ...form,
                result: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Unit"
            value={form.unit}
            onChange={(e) =>
              setForm({
                ...form,
                unit: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Reference Range"
            value={form.referenceRange}
            onChange={(e) =>
              setForm({
                ...form,
                referenceRange: e.target.value,
              })
            }
          />

          <textarea
            rows={4}
            className="w-full border rounded-lg p-3"
            placeholder="Remarks"
            value={form.remarks}
            onChange={(e) =>
              setForm({
                ...form,
                remarks: e.target.value,
              })
            }
          />

          <button
            onClick={uploadResult}
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
          >
            Save Result
          </button>

        </div>
      </div>
    </DashboardLayout>
  );
}