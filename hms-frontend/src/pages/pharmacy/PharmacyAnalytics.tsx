import { useEffect, useState } from "react";
import axios from "axios";

export default function PharmacyAnalytics() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/pharmacy-analytics",
      );

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!analytics) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Pharmacy Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-600 text-white p-5 rounded-xl">
          <p>Total Revenue</p>
          <h2 className="text-3xl font-bold">
            ₹{analytics.totalRevenue}
          </h2>
        </div>

        <div className="bg-blue-600 text-white p-5 rounded-xl">
          <p>Total Bills</p>
          <h2 className="text-3xl font-bold">
            {analytics.totalBills}
          </h2>
        </div>

        <div className="bg-purple-600 text-white p-5 rounded-xl">
          <p>Medicines Sold</p>
          <h2 className="text-3xl font-bold">
            {analytics.medicinesSold}
          </h2>
        </div>
      </div>
    </div>
  );
}