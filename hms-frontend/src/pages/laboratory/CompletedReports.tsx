import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../lib/api";

export default function CompletedReports() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await api.get("/lab/orders/completed");
      setReports(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports.filter(
    (report) =>
      report.patient.fullName.toLowerCase().includes(search.toLowerCase()) ||
      report.patient.patientNumber.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Completed Laboratory Reports</h1>

        <input
          className="border rounded-lg px-4 py-2 w-80"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-white rounded-xl shadow p-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Patient</th>
                  <th className="p-3 text-left">Doctor</th>
                  <th className="p-3 text-left">Tests</th>
                  <th className="p-3 text-left">Completed</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{report.patient.fullName}</td>

                    <td className="p-3">{report.doctor.fullName}</td>

                    <td className="p-3">{report.items.length}</td>

                    <td className="p-3">
                      {new Date(report.createdAt).toLocaleDateString()}
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      COMPLETED
                    </span>
                    </td>

                    <td className="p-3 space-x-2">
                      <a
                        href={`http://localhost:5000/api/lab-report/${report.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 text-white px-3 py-2 rounded"
                      >
                        View PDF
                      </a>

                      <a
                        href={`http://localhost:5000/api/lab-report/${report.id}`}
                        download
                        className="bg-green-600 text-white px-3 py-2 rounded"
                      >
                        Download
                      </a>

                      <button
                        onClick={() =>
                          window.open(
                            `http://localhost:5000/api/lab-report/${report.id}`,
                            "_blank",
                          )
                        }
                        className="bg-indigo-600 text-white px-3 py-2 rounded"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
