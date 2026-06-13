import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import PatientSearch from "../pages/patients/PatientSearch";
import NewOP from "../pages/op/NewOP";
import Complaint from "../pages/op/Complaint";
import AssignDoctor from "../pages/management/AssignDoctor";
import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import Consultation from "../pages/doctor/Consultation";

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
      </Routes>
    </BrowserRouter>
  );
}
