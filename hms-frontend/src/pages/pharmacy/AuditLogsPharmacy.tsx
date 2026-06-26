import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "axios";

export default function AuditLogsPharmacy() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/pharmacy/audit-logs",
      );

      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Pharmacy Audit Logs</h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Medicine</th>
                <th className="p-3">Action</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Date & Time</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b">
                  <td className="p-3">{log.medicineName}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        log.action === "STOCK_IN"
                          ? "bg-green-600"
                          : log.action === "STOCK_OUT"
                            ? "bg-red-600"
                            : "bg-blue-600"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td className="p-3">{log.quantity}</td>

                  <td className="p-3">
                    {new Date(log.createdAt).toLocaleString()}
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
