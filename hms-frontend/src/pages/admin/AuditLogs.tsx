import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axios from "axios";

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/audit");

      setLogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Audit Logs</h1>

        <div className="bg-white rounded-xl shadow p-6">
          <table className="w-full border">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">Action</th>
                <th className="p-3">User</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="p-3">{log.action}</td>

                  <td className="p-3">{log.userEmail}</td>

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
