import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
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
              to="/audit-logs"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Audit Logs
            </Link>

            <Link
              to="/reports"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Reports
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
              to="/appointments"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Appointments
            </Link>

            <Link
              to="/reports"
              className="block p-3 rounded hover:bg-slate-700"
            >
              Reports
            </Link>
          </>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="w-40 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold mt-4"
      >
        Logout
      </button>
    </div>
  );
}
