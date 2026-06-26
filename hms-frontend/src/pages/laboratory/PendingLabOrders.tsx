import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../lib/api";

export default function PendingLabOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get("/lab/orders/pending");

      setOrders(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Pending Laboratory Orders
        </h1>

        <div className="bg-white rounded-xl shadow p-6">

          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-3 text-left">
                    Patient
                  </th>

                  <th className="p-3 text-left">
                    Doctor
                  </th>

                  <th className="p-3 text-left">
                    Tests
                  </th>

                  <th className="p-3 text-left">
                    Status
                  </th>

                  <th className="p-3 text-left">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {order.patient.fullName}
                    </td>

                    <td className="p-3">
                      {order.doctor.fullName}
                    </td>

                    <td className="p-3">
                      {order.items.length}
                    </td>

                    <td className="p-3">

                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                        {order.status}
                      </span>

                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          navigate(
                            `/laboratory/upload/${order.items[0].id}`
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Upload Result
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}