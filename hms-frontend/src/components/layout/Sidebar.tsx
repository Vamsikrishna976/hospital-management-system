import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-8">HMS</h1>

      <nav className="space-y-2">
        {/* ADMIN */}
        {role === "ADMIN" && (
          <>
            <Link
              to="/dashboard"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Dashboard
            </Link>

            <Link to="/users" className="block p-3 rounded hover:bg-slate-700">
              User Management
            </Link>

            <Link
              to="/appointment-calendar"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Appointment Calendar
            </Link>

            <Link
              to="/audit-logs"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Audit Logs
            </Link>

            <Link
              to="/pharmacy/audit-logs"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Audit Logs
            </Link>

            <Link
              to="/inventory"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Inventory
            </Link>

            <Link
              to="/pharmacy/prescriptions"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Prescriptions
            </Link>

            <Link
              to="/pharmacy-billing"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Billing
            </Link>

            <Link
              to="/reports"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Reports
            </Link>

            <Link
              to="/pharmacy-analytics"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Analytics
            </Link>

            <Link
              to="/laboratory"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Laboratory Dashboard
            </Link>

            <Link
              to="/laboratory/tests"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Lab Tests
            </Link>

            <Link
              to="/laboratory/new-order"
              className="block p-3 rounded hover:bg-slate-700"
            >
              New Lab Order
            </Link>

            <Link
              to="/laboratory/pending"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pending Lab Orders
            </Link>

            <Link
              to="/laboratory/reports"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Completed Lab Reports
            </Link>

            <Link to="/ipd" className="block p-3 rounded hover:bg-slate-700">
              IPD Management
            </Link>

            <Link to="/beds" className="block p-3 rounded hover:bg-slate-700">
              Beds Available
            </Link>
          </>
        )}

        {/* RECEPTIONIST */}
        {role === "RECEPTIONIST" && (
          <>
            <Link
              to="/dashboard"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Dashboard
            </Link>

            <Link
              to="/patients/search"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Patient Search
            </Link>

            <Link
              to="/patients/register"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Patient Register
            </Link>

            <Link to="/op/new" className="block p-3 rounded hover:bg-slate-700">
              New OP
            </Link>

            <Link
              to="/appointment-calendar"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Appointment Calendar
            </Link>

            <Link
              to="/billing"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Billing
            </Link>

            <Link
              to="/billing-history"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Billing History
            </Link>

            <Link
              to="/inventory"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Inventory
            </Link>

            <Link
              to="/pharmacy-billing"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Billing
            </Link>

            <Link
              to="/pharmacy-analytics"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Analytics
            </Link>

            <Link
              to="/laboratory"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Laboratory Dashboard
            </Link>

            <Link
              to="/laboratory/tests"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Lab Tests
            </Link>

            <Link
              to="/laboratory/new-order"
              className="block p-3 rounded hover:bg-slate-700"
            >
              New Lab Order
            </Link>

            <Link
              to="/laboratory/pending"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pending Lab Orders
            </Link>

            <Link
              to="/laboratory/reports"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Completed Lab Reports
            </Link>

            <Link to="/ipd" className="block p-3 rounded hover:bg-slate-700">
              IPD Management
            </Link>

            <Link to="/beds" className="block p-3 rounded hover:bg-slate-700">
              Beds Available
            </Link>

            <Link
              to="/ipd-billing"
              className="block p-3 rounded hover:bg-slate-700"
            >
              IPD Billing
            </Link>
          </>
        )}

        {/* DOCTOR */}
        {role === "DOCTOR" && (
          <>
            <Link
              to="/doctor/dashboard"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Doctor Dashboard
            </Link>

            <Link
              to="/history"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Patient History
            </Link>
          </>
        )}

        {/* MANAGEMENT */}
        {role === "MANAGEMENT" && (
          <>
            <Link
              to="/dashboard"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Dashboard
            </Link>

            <Link
              to="/management/assign"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Assign Doctor
            </Link>

            <Link
              to="/appointment-calendar"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Appointment Calendar
            </Link>

            <Link
              to="/inventory"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Inventory
            </Link>

            <Link
              to="/pharmacy/prescriptions"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Prescriptions
            </Link>

            <Link
              to="/pharmacy-billing"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Billing
            </Link>

            <Link
              to="/pharmacy/audit-logs"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Audit Logs
            </Link>

            <Link
              to="/reports"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Reports
            </Link>

            <Link
              to="/pharmacy-analytics"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Pharmacy Analytics
            </Link>
            <Link to="/ipd" className="block p-3 rounded hover:bg-slate-700">
              IPD Management
            </Link>
          </>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold mt-8"
      >
        Logout
      </button>
    </div>
  );
}
