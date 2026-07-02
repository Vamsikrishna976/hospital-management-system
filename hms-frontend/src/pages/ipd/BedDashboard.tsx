import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import DashboardLayout from "@/layouts/DashboardLayout";
import BedCard from "../../components/bed/BedCard";
import PatientModal from "../../components/bed/PatientModal";
import BedStats from "../../components/bed/BedStats";
import BedFilters from "../../components/bed/BedFilters";

export default function BedDashboard() {
  const [beds, setBeds] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [selectedWard, setSelectedWard] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadBeds = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/beds");

      setBeds(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/beds/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (
    id: string,
    status: "AVAILABLE" | "MAINTENANCE",
  ) => {
    try {
      await axios.put(`http://localhost:5000/api/beds/${id}/status`, {
        status,
      });

      setBeds((prev) =>
        prev.map((bed) =>
          bed.id === id
            ? {
                ...bed,
                status,
              }
            : bed,
        ),
      );

      loadStats();
    } catch (err) {
      console.error(err);
    }
  };

  const viewPatient = async (bedId: string) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/beds/${bedId}/patient`,
      );

      setSelectedPatient(res.data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch patient details");
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      await Promise.all([loadBeds(), loadStats()]);
    };

    loadDashboard();

    const handleFocus = () => {
      loadDashboard();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const filteredBeds = useMemo(() => {
    return beds.filter((bed: any) => {
      const matchesSearch =
        bed.bedNumber.toLowerCase().includes(search.toLowerCase()) ||
        bed.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
        bed.ward.toLowerCase().includes(search.toLowerCase());

      const matchesWard = selectedWard === "ALL" || bed.ward === selectedWard;

      const matchesStatus =
        statusFilter === "ALL" || bed.status === statusFilter;

      return matchesSearch && matchesWard && matchesStatus;
    });
  }, [beds, search, selectedWard, statusFilter]);

  const groupedBeds = useMemo(() => {
    return filteredBeds.reduce((acc: any, bed: any) => {
      if (!acc[bed.ward]) {
        acc[bed.ward] = [];
      }

      acc[bed.ward].push(bed);

      return acc;
    }, {});
  }, [filteredBeds]);

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Bed Dashboard</h1>

        <BedFilters
          search={search}
          setSearch={setSearch}
          selectedWard={selectedWard}
          setSelectedWard={setSelectedWard}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <BedStats stats={stats} />

        <div className="space-y-8">
          {Object.entries(groupedBeds).map(([ward, wardBeds]: any) => (
            <div key={ward}>
              <h2 className="text-2xl font-bold mb-4 text-blue-700">
                🏥 {ward} Ward
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {wardBeds.map((bed: any) => (
                  <BedCard
                    key={bed.id}
                    bed={bed}
                    updateStatus={updateStatus}
                    viewPatient={viewPatient}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <PatientModal
          show={showModal}
          patient={selectedPatient}
          onClose={() => setShowModal(false)}
        />
      </div>
    </DashboardLayout>
  );
}
