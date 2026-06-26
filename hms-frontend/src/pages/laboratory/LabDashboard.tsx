import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function LabDashboard() {
  const [stats, setStats] = useState({
    totalTests: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const tests = await axios.get("http://localhost:5000/api/lab/tests");

      const orders = await axios.get(
        "http://localhost:5000/api/lab/orders/all",
      );

      const pending = orders.data.data.filter(
        (o: any) => o.status === "PENDING",
      );

      const completed = orders.data.data.filter(
        (o: any) => o.status === "COMPLETED",
      );

      setStats({
        totalTests: tests.data.count,
        pendingOrders: pending.length,
        completedOrders: completed.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-4 gap-5">
          <button className="bg-blue-600 text-white rounded-xl p-6 hover:bg-blue-700">
            Add Lab Test
          </button>

          <button className="bg-green-600 text-white rounded-xl p-6 hover:bg-green-700">
            Create Order
          </button>

          <button className="bg-yellow-500 text-white rounded-xl p-6 hover:bg-yellow-600">
            Pending Orders
          </button>

          <button className="bg-purple-600 text-white rounded-xl p-6 hover:bg-purple-700">
            Reports
          </button>
        </div>

        <div className="mt-10 bg-white shadow rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-5">Recent Activity</h2>

          <p>No recent activity.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
