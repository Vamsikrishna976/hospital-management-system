import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PatientSearch from "../pages/patients/PatientSearch";
import NewOP from "../pages/op/NewOP";
import Complaint from "../pages/op/Complaint";
import AssignDoctor from "../pages/management/AssignDoctor";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import Consultation from "../pages/doctor/Consultation";
import MedicineEntry from "../pages/doctor/MedicineEntry";
import PrescriptionView from "../pages/doctor/PrescriptionView";
import PatientHistory from "../pages/history/PatientHistory";
import Billing from "../pages/reception/Billing";
import BillingHistory from "../pages/reception/BillingHistory";
import PatientRegister from "../pages/patients/PatientRegister";
import AppointmentManagement from "../pages/management/AppointmentManagement";
import Reports from "../pages/reports/Reports";
import ProtectedRoute from "./ProctectedRoute";
import UserManagement from "../pages/admin/UserManagement";
import AuditLogs from "../pages/admin/AuditLogs";
import RoleProtectedRoute from "./RoleProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page without sidebar */}
        <Route path="/" element={<Login />} />

        {/*  */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["ADMIN", "MANAGEMENT", "RECEPTIONIST"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/patients/search" element={<PatientSearch />} />

        <Route path="/op/new" element={<NewOP />} />

        <Route path="/patients/register" element={<PatientRegister />} />

        <Route path="/op/complaint" element={<Complaint />} />

        <Route path="/management/assign" element={<AssignDoctor />} />

        <Route path="/history" element={<PatientHistory />} />

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/consultation"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <Consultation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/medicine"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <MedicineEntry />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/prescription"
          element={
            <ProtectedRoute allowedRoles={["DOCTOR"]}>
              <PrescriptionView />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "RECEPTIONIST"]}>
              <Billing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing-history"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "RECEPTIONIST"]}>
              <BillingHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGEMENT"]}>
              <AppointmentManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "MANAGEMENT"]}>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route path="/audit-logs" element={<AuditLogs />} />

        <Route
          path="/users"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <UserManagement />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/audit-logs"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN"]}>
              <AuditLogs />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <RoleProtectedRoute allowedRoles={["ADMIN", "MANAGEMENT"]}>
              <Reports />
            </RoleProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
