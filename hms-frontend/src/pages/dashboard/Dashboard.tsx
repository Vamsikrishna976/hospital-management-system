import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import RevenueChart from "../../components/dashboard/RevenueChart";
import PatientGrowthChart from "../../components/dashboard/PatientGrowthChart";
import axios from "axios";

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalOPRecords: number;
  totalBills: number;
  totalRevenue: number;
  pendingBills: number;
}

// const patientGrowthData = [
//   { month: "Jan", patients: 10 },
//   { month: "Feb", patients: 20 },
//   { month: "Mar", patients: 35 },
//   { month: "Apr", patients: 50 },
//   { month: "May", patients: 70 },
//   { month: "Jun", patients: 90 },
// ];

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [bills, setBills] = useState<any[]>([]);
  const [todayStats, setTodayStats] = useState<any>(null);
  const [doctorWorkload, setDoctorWorkload] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<any[]>([]);
  const [monthlyPatients, setMonthlyPatients] = useState<any[]>([]);
  
  const [notifications, setNotifications] = useState({
    lowStockCount: 0,
    expiringSoonCount: 0,
    lowStock: [],
    expiringSoon: [],
  });

  useEffect(() => {
    fetchDashboard();
    fetchRecentPatients();
    fetchRecentBills();
    fetchTodayStats();
    fetchDoctorWorkload();
    fetchActivities();
    fetchReports();
    fetchNotifications();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/dashboard");

      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reports");

      setMonthlyRevenue(response.data.monthlyRevenue || []);
      setMonthlyPatients(response.data.monthlyPatients || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecentPatients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/recent-patients",
      );

      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecentBills = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/recent-bills",
      );

      setBills(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTodayStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/today",
      );

      setTodayStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDoctorWorkload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/dashboard/doctor-workload",
      );

      setDoctorWorkload(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/audit");

      setActivities(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/notifications",
      );

      setNotifications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Hospital Dashboard</h1>

          <p className="text-gray-500">Overview of hospital operations</p>
        </div>
        {/* Stats Cards */}
        <div className="grid md:grid-cols-6 lg:grid-cols-6 gap-6">
          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow">
            <p>Total Patients</p>
            <h2 className="text-4xl font-bold mt-2">{stats.totalPatients}</h2>
          </div>

          <div className="bg-green-600 text-white p-6 rounded-2xl shadow">
            <p>Total Doctors</p>
            <h2 className="text-4xl font-bold mt-2">{stats.totalDoctors}</h2>
          </div>

          <div className="bg-orange-500 text-white p-6 rounded-2xl shadow">
            <p>OP Records</p>
            <h2 className="text-4xl font-bold mt-2">{stats.totalOPRecords}</h2>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow">
            <p>Total Bills</p>
            <h2 className="text-4xl font-bold mt-2">{stats.totalBills}</h2>
          </div>

          <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow">
            <p>Revenue</p>
            <h2 className="text-3xl font-bold mt-2">₹{stats.totalRevenue}</h2>
          </div>

          <div className="bg-red-600 text-white p-6 rounded-2xl shadow">
            <p>Pending Bills</p>
            <h2 className="text-4xl font-bold mt-2">{stats.pendingBills}</h2>
          </div>
        </div>
        {/* LOow stock notification */}

        <div className="grid md:grid-cols-2 gap-4 mb-6 pt-5">
          <div className="bg-red-600 text-white p-4 rounded-xl">
            <p>Low Stock Alerts</p>

            <h2 className="text-3xl font-bold">
              {notifications.lowStockCount}
            </h2>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-xl">
            <p>Expiring Medicines</p>

            <h2 className="text-3xl font-bold">
              {notifications.expiringSoonCount}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Notifications</h2>

          {notifications.lowStock.map((medicine: any) => (
            <div key={medicine.id} className="bg-red-100 p-3 rounded mb-2">
              ⚠ Low Stock: {medicine.medicineName} ({medicine.stockQuantity})
            </div>
          ))}

          {notifications.expiringSoon.map((medicine: any) => (
            <div key={medicine.id} className="bg-yellow-100 p-3 rounded mb-2">
              ⚠ Expiring Soon: {medicine.medicineName}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Today's Activity</h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-cyan-600 text-white p-6 rounded-2xl shadow">
              <p>Today's Patients</p>

              <h2 className="text-4xl font-bold">
                {todayStats?.todayPatients || 0}
              </h2>
            </div>

            <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow">
              <p>Today's OP</p>

              <h2 className="text-4xl font-bold">
                {todayStats?.todayOPRecords || 0}
              </h2>
            </div>

            <div className="bg-amber-500 text-white p-6 rounded-2xl shadow">
              <p>Today's Bills</p>

              <h2 className="text-4xl font-bold">
                {todayStats?.todayBills || 0}
              </h2>
            </div>

            <div className="bg-emerald-600 text-white p-6 rounded-2xl shadow">
              <p>Today's Revenue</p>

              <h2 className="text-3xl font-bold">
                ₹{todayStats?.todayRevenue || 0}
              </h2>
            </div>
          </div>
        </div>

        {/* Revenue chart*/}

        <div className="mt-6">
          <RevenueChart data={monthlyRevenue} />
        </div>

        {/* PatientGrowthChart*/}

        <div className="mt-6">
          <PatientGrowthChart data={monthlyPatients} />
        </div>

        <div className="bg-white rounded-xl shadow p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>

          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="border-b pb-2">
                <p className="font-medium">{activity.action}</p>

                <p className="text-sm text-gray-500">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 bg-white shadow rounded-2xl p-6 border">
          <h2 className="text-2xl font-bold mb-4">Recent Patients</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Patient ID</th>

                <th className="text-left p-3">Name</th>

                <th className="text-left p-3">Mobile</th>

                <th className="text-left p-3">Age</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{patient.patientNumber}</td>

                  <td className="p-3">{patient.fullName}</td>

                  <td className="p-3">{patient.mobile}</td>

                  <td className="p-3">{patient.age}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 bg-white shadow rounded-2xl p-6 border">
            <h2 className="text-2xl font-bold mb-4">Recent Bills</h2>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Bill No</th>

                  <th className="text-left p-3">Patient</th>

                  <th className="text-left p-3">Amount</th>

                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{bill.billNumber}</td>

                    <td className="p-3">{bill.opRecord.patient.fullName}</td>

                    <td className="p-3 font-bold">₹{bill.totalAmount}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          bill.paymentStatus === "PAID"
                            ? "bg-green-600"
                            : "bg-orange-500"
                        }`}
                      >
                        {bill.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-10 bg-white shadow rounded-2xl p-6 border">
            <h2 className="text-2xl font-bold mb-4">Doctor Workload</h2>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left">Doctor</th>

                  <th className="p-3 text-left">Specialization</th>

                  <th className="p-3 text-left">Appointments</th>
                </tr>
              </thead>

              <tbody>
                {doctorWorkload.map((doctor) => (
                  <tr key={doctor.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{doctor.doctorName}</td>

                    <td className="p-3">{doctor.specialization}</td>

                    <td className="p-3">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full">
                        {doctor.totalAppointments}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>

          <div className="grid md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/patients/search")}
              className="bg-blue-600 text-white p-4 rounded-xl shadow hover:bg-blue-700"
            >
              🔍 Search Patient
            </button>

            <button
              onClick={() => navigate("/patients/register")}
              className="bg-green-600 text-white p-4 rounded-xl shadow hover:bg-green-700"
            >
              📝 New OP Registration
            </button>

            <button
              onClick={() => navigate("/management/assign")}
              className="bg-orange-500 text-white p-4 rounded-xl shadow hover:bg-orange-600"
            >
              👨‍⚕️ Assign Doctor
            </button>

            <button
              onClick={() => navigate("/billing-history")}
              className="bg-purple-600 text-white p-4 rounded-xl shadow hover:bg-purple-700"
            >
              💰 Billing History
            </button>
          </div>
        </div>
        {/* Revenue Summary */}
        <div className="mt-10 bg-white shadow rounded-2xl p-6 border">
          <h2 className="text-2xl font-bold mb-4">Revenue Summary</h2>

          <div className="flex justify-between items-center">
            <p className="text-gray-600">Total Paid Revenue</p>

            <h2 className="text-4xl font-black text-green-600">
              ₹{stats.totalRevenue}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
