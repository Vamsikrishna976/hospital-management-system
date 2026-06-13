import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-white shadow rounded-xl p-5">
          Total Patients
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          Today's OP
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          Doctors
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          Appointments
        </div>
      </div>
    </DashboardLayout>
  );
}