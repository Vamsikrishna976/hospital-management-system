import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">
        HMS
      </h1>

      <nav className="space-y-3">
        <Link to="/dashboard" className="block">
          Dashboard
        </Link>

        <Link
          to="/patients/search"
          className="block"
        >
          Patients
        </Link>

        <Link
          to="/op/new"
          className="block"
        >
          New OP
        </Link>

        <Link
          to="/management/assign"
          className="block"
        >
          Assign Doctor
        </Link>

        <Link
          to="/doctor/dashboard"
          className="block"
        >
          Doctor Dashboard
        </Link>
      </nav>
    </div>
  );
}