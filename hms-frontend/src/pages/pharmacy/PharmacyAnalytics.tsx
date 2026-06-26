import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function PharmacyAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/pharmacy-analytics",
      );

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!analytics) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Pharmacy Analytics</h1>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-600 text-white p-5 rounded-xl">
            <p>Total Revenue</p>
            <h2 className="text-3xl font-bold">₹{analytics.totalRevenue}</h2>
          </div>

          <div className="bg-blue-600 text-white p-5 rounded-xl">
            <p>Total Bills</p>
            <h2 className="text-3xl font-bold">{analytics.totalBills}</h2>
          </div>

          <div className="bg-purple-600 text-white p-5 rounded-xl">
            <p>Medicines Sold</p>
            <h2 className="text-3xl font-bold">{analytics.medicinesSold}</h2>
          </div>
        </div>
      </div>

      <div className="bg-white mt-8 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Revenue Analytics</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={analytics.revenueChart}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="revenue" fill="#16a34a" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white mt-8 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">🏆 Top Selling Medicines</h2>

        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Medicine</th>
              <th className="p-3 text-center">Quantity Sold</th>
            </tr>
          </thead>

          <tbody>
            {analytics.topSellingMedicines.map(
              (medicine: any, index: number) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">
                    {index === 0 && "🥇 "}
                    {index === 1 && "🥈 "}
                    {index === 2 && "🥉 "}
                    {medicine.medicineName}
                  </td>
                  <td className="p-3 text-center">{medicine.quantity}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
