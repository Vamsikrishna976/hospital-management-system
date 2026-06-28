import DashboardLayout from "../layouts/DashboardLayout";

export default function PatientSearch() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Search Patient
      </h1>

      <input
        type="text"
        placeholder="Enter Mobile Number"
        className="border p-3 rounded-lg w-full"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        Search Patient
      </button>
    </DashboardLayout>
  );
}