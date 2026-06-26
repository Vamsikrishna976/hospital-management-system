import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface Bill {
  id: string;
  billNumber: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;

  consultationFee?: number;
  medicineFee?: number;
  labFee?: number;
  otherFee?: number;

  opRecord: any;
}

export default function BillingHistory() {
  const [bills, setBills] = useState<Bill[]>([]);

  const [search, setSearch] = useState("");

  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const totalBills = bills.length;

  const paidBills = bills.filter(
    (bill) => bill.paymentStatus === "PAID",
  ).length;

  const pendingBills = bills.filter(
    (bill) => bill.paymentStatus === "PENDING",
  ).length;

  const totalRevenue = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);

  const filteredBills = bills.filter((bill) => {
    const searchText = search.toLowerCase();

    return (
      bill.billNumber?.toLowerCase().includes(searchText) ||
      bill.opRecord?.patient?.fullName?.toLowerCase().includes(searchText) ||
      bill.opRecord?.patient?.mobile?.toString().includes(search)
    );
  });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/billing/history",
    );

    setBills(
      response.data.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
  };

  const printBill = (bill: Bill) => {
    const printWindow = window.open("", "_blank", "width=800,height=700");

    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>${bill.billNumber}</title>

        <style>
          body{
            font-family: Arial, sans-serif;
            padding:30px;
          }

          h2{
            color:#1d4ed8;
            margin-bottom:5px;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:20px;
          }

          td{
            padding:8px;
            border-bottom:1px solid #ddd;
          }

          .total{
            font-size:22px;
            font-weight:bold;
            color:#1d4ed8;
          }
        </style>
      </head>

      <body>

        <h2>Sri Kavya Krishna Super Speciality Hospital</h2>
        <p>Bangalore • +91 9876543210</p>

        <hr/>

        <table>
          <tr>
            <td><b>Bill Number</b></td>
            <td>${bill.billNumber}</td>
          </tr>

          <tr>
            <td><b>Date</b></td>
            <td>${new Date(bill.createdAt).toLocaleDateString()}</td>
          </tr>

          <tr>
            <td><b>Patient</b></td>
            <td>${bill.opRecord.patient.fullName}</td>
          </tr>

          <tr>
            <td><b>Mobile</b></td>
            <td>${bill.opRecord.patient.mobile}</td>
          </tr>

          <tr>
            <td><b>OP Number</b></td>
            <td>${bill.opRecord.opNumber}</td>
          </tr>

          <tr>
            <td><b>Status</b></td>
            <td>${bill.paymentStatus}</td>
          </tr>
        </table>

        <h3 style="margin-top:25px">Charges</h3>

        <table>
          <tr>
            <td>Consultation Fee</td>
            <td>₹${bill.consultationFee || 0}</td>
          </tr>

          <tr>
            <td>Medicine Fee</td>
            <td>₹${bill.medicineFee || 0}</td>
          </tr>

          <tr>
            <td>Lab Fee</td>
            <td>₹${bill.labFee || 0}</td>
          </tr>

          <tr>
            <td>Other Charges</td>
            <td>₹${bill.otherFee || 0}</td>
          </tr>
        </table>

        <h3 class="total">
          Total Amount : ₹${bill.totalAmount}
        </h3>

      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  console.log(printBill);

  const exportToExcel = () => {
    const excelData = filteredBills.map((bill) => ({
      "Bill Number": bill.billNumber,
      Patient: bill.opRecord.patient.fullName,
      Mobile: bill.opRecord.patient.mobile,
      "OP Number": bill.opRecord.opNumber,
      Amount: bill.totalAmount,
      Status: bill.paymentStatus,
      Date: new Date(bill.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet["!cols"] = [
      { wch: 20 },
      { wch: 25 },
      { wch: 15 },
      { wch: 20 },
      { wch: 12 },
      { wch: 15 },
      { wch: 15 },
    ];

    // const range = XLSX.utils.decode_range(worksheet["!ref"]!);

    // for (let C = range.s.c; C <= range.e.c; ++C) {
    //   const cell = XLSX.utils.encode_cell({ r: 0, c: C });

    //   if (worksheet[cell]) {
    //     worksheet[cell].s = {
    //       font: { bold: true },
    //     };
    //   }
    // }

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Billing History");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "BillingHistory.xlsx");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Billing History</h1>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-600 text-white p-4 rounded-xl">
            <p>Total Bills</p>
            <h2 className="text-3xl font-bold">{totalBills}</h2>
          </div>

          <div className="bg-green-600 text-white p-4 rounded-xl">
            <p>Paid Bills</p>
            <h2 className="text-3xl font-bold">{paidBills}</h2>
          </div>

          <div className="bg-orange-500 text-white p-4 rounded-xl">
            <p>Pending Bills</p>
            <h2 className="text-3xl font-bold">{pendingBills}</h2>
          </div>

          <div className="bg-purple-600 text-white p-4 rounded-xl">
            <p>Revenue</p>
            <h2 className="text-3xl font-bold">₹{totalRevenue}</h2>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by Bill Number, Patient Name or Mobile"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
          >
            📊 Export Excel
          </button>
        </div>

        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-600">
            Showing {filteredBills.length} of {bills.length} bills
          </p>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Bill No</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">OP No</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBills.length > 0 ? (
                filteredBills.map((bill: any) => (
                  <tr key={bill.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{bill.billNumber}</td>

                    <td className="p-3">{bill.opRecord.patient.fullName}</td>

                    <td className="p-3">{bill.opRecord.patient.mobile}</td>

                    <td className="p-3">{bill.opRecord.opNumber}</td>

                    <td className="p-3 font-bold text-green-700">
                      ₹{bill.totalAmount}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          bill.paymentStatus === "PAID"
                            ? "bg-green-600"
                            : "bg-orange-500"
                        }`}
                      >
                        {bill.paymentStatus}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(bill.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => setSelectedBill(bill)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        View
                      </button>

                      <button
                        onClick={() => printBill(bill)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-gray-500">
                    No bills found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {selectedBill && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 w-[600px] shadow-2xl relative">
                <button
                  onClick={() => setSelectedBill(null)}
                  className="absolute top-4 right-4 text-xl font-bold"
                >
                  ✕
                </button>

                <h2 className="text-2xl font-bold mb-6">Bill Details</h2>

                <div className="mb-4 border-b pb-4">
                  <h3 className="text-lg font-bold text-blue-700">
                    Sri Kavya Krishna Super Speciality Hospital
                  </h3>

                  <p className="text-sm text-gray-500">
                    Bangalore • +91 9876543210
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-500">Receipt Number</p>

                    <p className="font-bold text-blue-700">
                      {selectedBill.billNumber}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Date</p>
                    <p>
                      {new Date(selectedBill.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">Patient</p>
                    <p>{selectedBill.opRecord.patient.fullName}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Mobile</p>
                    <p>{selectedBill.opRecord.patient.mobile}</p>
                  </div>

                  <div>
                    <p className="font-semibold">OP Number</p>
                    <p>{selectedBill.opRecord.opNumber}</p>
                  </div>

                  <div>
                    <p className="font-semibold">Status</p>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                        selectedBill.paymentStatus === "PAID"
                          ? "bg-green-600"
                          : "bg-orange-500"
                      }`}
                    >
                      {selectedBill.paymentStatus}
                    </span>{" "}
                  </div>
                </div>

                <hr className="my-6" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Consultation Fee</span>
                    <span>₹{selectedBill.consultationFee}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Medicine Fee</span>
                    <span>₹{selectedBill.medicineFee}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Lab Fee</span>
                    <span>₹{selectedBill.labFee}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Other Charges</span>
                    <span>₹{selectedBill.otherFee}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-xl font-bold text-blue-700">
                    <span>Total Amount</span>
                    <span>₹{selectedBill.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
