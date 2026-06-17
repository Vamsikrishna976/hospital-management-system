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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/patients/search" element={<PatientSearch />} />

        <Route path="/op/new" element={<NewOP />} />

        <Route path="/op/complaint" element={<Complaint />} />

        <Route path="/management/assign" element={<AssignDoctor />} />

        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        <Route path="/doctor/consultation" element={<Consultation />} />

        <Route path="/doctor/medicine" element={<MedicineEntry />} />

        <Route path="/doctor/prescription" element={<PrescriptionView />} />

        <Route path="/history" element={<PatientHistory />} />

        <Route path="/billing" element={<Billing />} />

        <Route path="/billing-history" element={<BillingHistory />} />
      </Routes>
    </BrowserRouter>
  );
}
