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

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/op", opRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctor-dashboard", doctorDashboardRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/prescriptions", pdfRoutes);
app.use("/api/consultations", consultationRoutes);

app.get("/", (req, res) => {
  res.send("Hospital Management System API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
