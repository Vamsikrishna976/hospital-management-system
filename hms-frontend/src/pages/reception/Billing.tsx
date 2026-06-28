import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function Billing() {
  const [opRecordId, setOpRecordId] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const incomingOpRecordId = location.state?.opRecordId;

  const [bill, setBill] = useState<any>(null);

  useEffect(() => {
    if (incomingOpRecordId) {
      setOpRecordId(incomingOpRecordId);

      fetchBill(incomingOpRecordId);
    }
  }, []);

  const fetchBill = async (id?: string) => {
    try {
      const recordId = id || opRecordId;
      console.log("recordid:", recordId);

      const response = await axios.get(
        `http://localhost:5000/api/billing/${recordId}`,
      );

      console.log("Billing API Response:", response.data);

      setBill(response.data);
    } catch (error) {
      alert("Bill not found");
    }
  };

  const payBill = async () => {
    try {
      await axios.put(`http://localhost:5000/api/billing/pay/${bill.id}`);

      await fetchBill();

      alert("✅ Payment Successful");
    } catch (error) {
      console.error("Payment Failed");
    }
  };

  //   const downloadPDF = () => {
  //     if (!bill) return;

  //     const pdf = new jsPDF();

  //     // Header
  //     pdf.setFontSize(18);
  //     pdf.text("HOSPITAL MANAGEMENT SYSTEM", 20, 20);

  //     pdf.setFontSize(12);
  //     pdf.text(`Bill Number: ${bill.billNumber}`, 20, 40);

  //     pdf.text(`Date: ${new Date(bill.createdAt).toLocaleDateString()}`, 20, 50);

  //     // Patient Details
  //     pdf.setFontSize(14);
  //     pdf.text("Patient Details", 20, 70);

  //     pdf.setFontSize(12);
  //     pdf.text(`Patient Name: ${bill.opRecord.patient.fullName}`, 20, 85);

  //     pdf.text(`OP Number: ${bill.opRecord.opNumber}`, 20, 95);

  //     // Charges
  //     pdf.setFontSize(14);
  //     pdf.text("Billing Details", 20, 115);

  //     pdf.setFontSize(12);

  //     pdf.text(`Consultation Fee : ₹${bill.consultationFee}`, 20, 130);

  //     pdf.text(`Medicine Fee : ₹${bill.medicineFee}`, 20, 140);

  //     pdf.text(`Lab Fee : ₹${bill.labFee}`, 20, 150);

  //     pdf.text(`Other Charges : ₹${bill.otherFee}`, 20, 160);

  //     pdf.line(20, 170, 180, 170);

  //     pdf.setFontSize(14);
  //     pdf.text(`Total Amount : ₹${bill.totalAmount}`, 20, 185);

  //     pdf.text(`Payment Status : ${bill.paymentStatus}`, 20, 195);

  //     pdf.line(20, 205, 180, 205);

  //     pdf.setFontSize(10);
  //     pdf.text("Thank you for visiting.", 20, 220);

  //     pdf.save(`${bill.billNumber}.pdf`);
  //   };

  const downloadPDF = async () => {
    const input = document.getElementById("bill-container");

    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);

    pdf.save(`${bill.billNumber}.pdf`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Billing Management</h1>

          <p className="text-gray-500">Search and manage patient bills</p>
        </div>
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter Mobile Number/ Bill Number/ OP NUmber"
            value={opRecordId}
            onChange={(e) => setOpRecordId(e.target.value)}
            className="border p-3 flex-1 rounded"
          />

          <button
            onClick={() => fetchBill()}
            className="bg-blue-600 text-white px-6 rounded"
          >
            Search
          </button>
        </div>
        {bill && (
          <>
            <div
              id="bill-container"
              className="relative bg-white shadow-xl rounded-3xl p-10 border border-slate-200 overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                <h1 className="text-[250px] font-black text-blue-900">SKK</h1>
              </div>

              <div className="border-b pb-8 mb-8">
                <div className="grid grid-cols-12 items-center gap-4">
                  {/* Logo */}
                  <div className="col-span-2 flex justify-center">
                    <img
                      src="/hospital-logo3.png"
                      alt="Hospital Logo"
                      className="w-28 h-28 object-contain"
                    />
                  </div>

                  {/* Hospital Details */}
                  <div className="col-span-8 text-center">
                    <h1 className="text-5xl font-black tracking-wide">
                      CITY CARE
                    </h1>

                    <h2 className="text-3xl font-bold text-blue-700">
                      SUPER SPECIALITY HOSPITAL
                    </h2>

                    <p className="mt-4 text-gray-700 text-lg">
                      General Medicine • Cardiology • Pediatrics • Orthopedics
                    </p>

                    <p className="text-gray-600 mt-2">
                      Bangalore, Karnataka | +91 9876543210
                    </p>

                    <p className="text-gray-600">info@skkhospital.com</p>

                    <div className="mt-3 inline-block bg-blue-50 px-4 py-2 rounded-lg text-sm">
                      24/7 Emergency Care • NABH Accredited • ISO Certified
                    </div>
                  </div>

                  {/* Receipt Badge */}
                  <div className="col-span-2 flex justify-end">
                    <div className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold shadow">
                      BILL RECEIPT
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-8 gap-x-12 bg-slate-50 border rounded-2xl p-8 mb-8">
                <div>
                  <p className="font-semibold text-gray-700">Bill Number</p>
                  <p>{bill.billNumber}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Date</p>
                  <p>{new Date(bill.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Patient ID</p>
                  <p>{bill.opRecord.patient.patientNumber}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">Patient Name</p>
                  <p>{bill.opRecord.patient.fullName}</p>
                </div>

                <div>
                  <p className="font-semibold text-gray-700">OP Number</p>
                  <p>{bill.opRecord.opNumber}</p>
                </div>
              </div>

              <hr className="my-6" />

              <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border p-3 text-left">Description</th>

                    <th className="border p-3 text-right">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="border p-3">Consultation Fee</td>

                    <td className="border p-3 text-right">
                      ₹{bill.consultationFee}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-3">Medicine Fee</td>

                    <td className="border p-3 text-right">
                      ₹{bill.medicineFee}
                    </td>
                  </tr>

                  <tr>
                    <td className="border p-3">Lab Fee</td>

                    <td className="border p-3 text-right">₹{bill.labFee}</td>
                  </tr>

                  <tr>
                    <td className="border p-3">Other Charges</td>

                    <td className="border p-3 text-right">₹{bill.otherFee}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between items-end mt-10">
                {/* Payment */}
                <div>
                  <p className="font-semibold mb-3">Payment Status</p>

                  <span
                    className={`px-5 py-2 rounded-full text-white font-bold ${
                      bill.paymentStatus === "PAID"
                        ? "bg-green-600"
                        : "bg-orange-500"
                    }`}
                  >
                    {bill.paymentStatus}
                  </span>
                </div>

                {/* Message */}
                <div className="text-center text-gray-500">
                  <p>Thank you for choosing City Care Hospital</p>

                  <p>Get Well Soon ❤️</p>
                </div>

                {/* Total */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-lg min-w-[200px] text-center">
                  <p className="text-blue-100">Total Amount</p>

                  <h2 className="text-5xl font-black">₹{bill.totalAmount}</h2>
                </div>
              </div>
              <hr className="my-8 border-gray-200" />
              <div className="flex justify-end mt-16">
                <div className="text-center">
                  <div className="h-12"></div>

                  <p className="border-t border-gray-400 pt-2 w-44 text-sm text-gray-700">
                    Authorized Signature
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="mt-6 flex gap-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
          >
            🖨️ Print Bill
          </button>

          <button
            onClick={downloadPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow"
          >
            📄 Download PDF
          </button>

          <button
            onClick={payBill}
            disabled={bill?.paymentStatus === "PAID"}
            className={`px-6 py-3 rounded-lg shadow text-white ${
              bill?.paymentStatus === "PAID"
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            💳{" "}
            {bill?.paymentStatus === "PAID" ? "Already Paid" : "Mark as Paid"}
          </button>

          <button
            onClick={() => navigate("/billing-history")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg shadow"
          >
            📜 Billing History
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
