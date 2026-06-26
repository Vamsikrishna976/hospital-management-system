import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.ts";
import patientRoutes from "./routes/patient.routes.ts";
import opRoutes from "./routes/op.routes.ts";
import complaintRoutes from "./routes/complaint.routes.ts";
import doctorRoutes from "./routes/doctor.routes.ts";
import appointmentRoutes from "./routes/appointment.routes.ts";
import doctorDashboardRoutes from "./routes/doctorDashboard.routes.ts";
import prescriptionRoutes from "./routes/prescription.routes.ts";
import pdfRoutes from "./routes/pdf.routes.ts";
import consultationRoutes from "./routes/consultation.routes.ts";
import medicineRoutes from "./routes/medicine.routes.ts";
import historyRoutes from "./routes/history.routes.ts";
import billingRoutes from "./routes/billing.routes.ts";
import dashboardRoutes from "./routes/dashboard.routes.ts";
import reportRoutes from "./routes/report.routes.ts";
import userRoutes from "./routes/user.routes.ts";
import auditRoutes from "./routes/audit.routes.ts";
import inventoryRoutes from "./routes/inventory.routes.ts";
import pharmacyRoutes from "./routes/pharmacy.routes.ts";
import pharmacyBillingRoutes from "./routes/pharmacyBilling.routes.ts";
import notificationRoutes from "./routes/notification.routes.ts";
import pharmacyAnalyticsRoutes from "./routes/pharmacyAnalytics.routes.ts";
import labRoutes from "./routes/lab.routes.ts";
import labReportRoutes from "./routes/labReport.routes.ts";
import appointmentCalendarRoutes from "./routes/appointmentCalendar.routes.ts";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/op", opRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctor-dashboard", doctorDashboardRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/prescriptions", pdfRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/inventory", inventoryRoutes);
app.get("/", (req, res) => {
  res.send("Hospital Management System API Running");
});
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/pharmacy-bills", pharmacyBillingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/pharmacy-analytics", pharmacyAnalyticsRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/lab-report", labReportRoutes);
app.use("/api/appointment-calendar", appointmentCalendarRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
