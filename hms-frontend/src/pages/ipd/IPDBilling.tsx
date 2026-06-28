import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function IPDBilling() {
  const [admissionId, setAdmissionId] = useState("");
  const [bill, setBill] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchBill = async () => {
    if (!admissionId.trim()) {
      alert("Enter Admission ID");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/ipd-billing/${admissionId}`,
      );

      setBill(res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Bill not found");
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async () => {
    if (!bill) return;

    try {
      await axios.put(`http://localhost:5000/api/ipd-billing/${bill.id}/pay`);

      // Reload updated bill
      const res = await axios.get(
        `http://localhost:5000/api/ipd-billing/${admissionId}`,
      );

      setBill(res.data);

      alert("Payment completed successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update payment");
    }
  };

  useEffect(() => {
    const id = searchParams.get("admissionId");

    if (!id) return;

    setAdmissionId(id);

    const fetchBill = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/api/ipd-billing/${id}`,
        );

        setBill(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [searchParams]);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">IPD Billing</h1>

          <button
            onClick={() => navigate("/ipd")}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Admission ID"
              value={admissionId}
              onChange={(e) => setAdmissionId(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-3"
            />

            <button
              onClick={searchBill}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {bill && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold">{bill.billNumber}</h2>

              <p>
                <strong>Patient:</strong> {bill.admission.patient.fullName}
              </p>

              <p>
                <strong>Admission No:</strong> {bill.admission.admissionNo}
              </p>

              <p>
                <strong>Ward:</strong> {bill.admission.bed?.ward}
              </p>

              <p>
                <strong>Room:</strong> {bill.admission.bed?.roomNumber}
              </p>
            </div>
            {/* Table */}
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Room Charges</td>
                  <td className="text-right">₹ {bill.roomCharges}</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Doctor Charges</td>
                  <td className="text-right">₹ {bill.doctorCharges}</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Lab Charges</td>
                  <td className="text-right">₹ {bill.labCharges}</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Pharmacy Charges</td>
                  <td className="text-right">₹ {bill.pharmacyCharges}</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Other Charges</td>
                  <td className="text-right">₹ {bill.otherCharges}</td>
                </tr>

                <tr className="font-bold text-xl">
                  <td className="py-4">Total</td>
                  <td className="text-right text-green-600">
                    ₹ {bill.totalAmount}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Payment Status */}

            <div className="mt-6 flex justify-between items-center">
              <div>
                <span className="font-semibold">Payment Status:</span>

                <span
                  className={`ml-3 px-4 py-2 rounded-full text-white font-semibold ${
                    bill.paymentStatus === "PAID"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {bill.paymentStatus}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              {bill.paymentStatus === "PENDING" && (
                <button
                  onClick={markAsPaid}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
