import { useEffect, useState } from "react";
import axios from "axios";

export default function PharmacyBilling() {
  const [patientName, setPatientName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [bills, setBills] = useState<any[]>([]);
  const [revenue, setRevenue] = useState({
    totalRevenue: 0,
    totalBills: 0,
  });

  useEffect(() => {
    fetchBills();
    fetchRevenue();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/pharmacy-bills",
      );

      setBills(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createBill = async () => {
    try {
      await axios.post("http://localhost:5000/api/pharmacy-bills", {
        patientName,
        totalAmount: Number(totalAmount),
      });

      alert("Bill Created");

      setPatientName("");
      setTotalAmount("");

      fetchBills();
      fetchRevenue();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/pharmacy-bills/revenue",
      );

      setRevenue(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Revenue DashBoard Cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-600 text-white p-4 rounded-xl">
          <p>Total Bills</p>
          <h2 className="text-3xl font-bold">{revenue.totalBills}</h2>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-xl">
          <p>Total Revenue</p>
          <h2 className="text-3xl font-bold">₹{revenue.totalRevenue}</h2>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Pharmacy Billing</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <input
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="border p-3 rounded w-full mb-4"
        />

        <input
          type="number"
          placeholder="Total Amount"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          className="border p-3 rounded w-full mb-4"
        />

        <button
          onClick={createBill}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Generate Bill
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Bill No</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-b">
                <td className="p-3">{bill.billNumber}</td>

                <td className="p-3">{bill.patientName}</td>

                <td className="p-3">₹{bill.totalAmount}</td>

                <td className="p-3">
                  {new Date(bill.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <a
                    href={`http://localhost:5000/api/pharmacy-bills/pdf/${bill.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
