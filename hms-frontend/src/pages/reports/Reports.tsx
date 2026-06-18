import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const [report, setReport] = useState<any>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reports");

      setReport(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const exportToExcel = () => {
    const reportData = [
      {
        "Total Patients": report.totalPatients,
        "Total Doctors": report.totalDoctors,
        "Total Appointments": report.totalAppointments,
        "Total Bills": report.totalBills,
        "Total Revenue": report.totalRevenue,
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(reportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "HMS Reports");

    XLSX.writeFile(workbook, "HMS_Report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Hospital Management System Report", 14, 20);

    autoTable(doc, {
      startY: 35,

      head: [["Metric", "Value"]],

      body: [
        ["Total Patients", report.totalPatients],
        ["Total Doctors", report.totalDoctors],
        ["Total Appointments", report.totalAppointments],
        ["Total Bills", report.totalBills],
        ["Total Revenue", `Rs.${report.totalRevenue}`],
      ],
    });

    doc.setFontSize(14);

    doc.text("Revenue Analytics Summary", 14, 120);

    doc.setFontSize(11);

    doc.text(`Current Revenue Generated: Rs.${report.totalRevenue}`, 14, 130);

    doc.text(`Generated On: ${new Date().toLocaleString()}`, 14, 140);

    doc.save("HMS_Report.pdf");
  };

  if (!report) {
    return <p>Loading...</p>;
  }

  const revenueData = report.monthlyRevenue;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Reports & Analytics</h1>

      <div className="grid md:grid-cols-5 gap-4">
        <div className="bg-blue-600 text-white p-5 rounded-xl">
          <p>Total Patients</p>
          <h2 className="text-3xl font-bold">{report.totalPatients}</h2>
        </div>

        <div className="bg-green-600 text-white p-5 rounded-xl">
          <p>Total Doctors</p>
          <h2 className="text-3xl font-bold">{report.totalDoctors}</h2>
        </div>

        <div className="bg-orange-500 text-white p-5 rounded-xl">
          <p>Appointments</p>
          <h2 className="text-3xl font-bold">{report.totalAppointments}</h2>
        </div>

        <div className="bg-purple-600 text-white p-5 rounded-xl">
          <p>Total Bills</p>
          <h2 className="text-3xl font-bold">{report.totalBills}</h2>
        </div>

        <div className="bg-red-600 text-white p-5 rounded-xl">
          <p>Revenue</p>
          <h2 className="text-3xl font-bold">₹{report.totalRevenue}</h2>
        </div>
      </div>

      <div className="bg-white mt-8 p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Revenue Analytics</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          📄 Download PDF
        </button>

        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          📊 Export Excel
        </button>
      </div>
    </div>
  );
}
