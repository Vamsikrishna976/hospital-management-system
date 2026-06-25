import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../lib/api";

interface LabTest {
  id: string;
  testCode: string;
  testName: string;
  category: string;
  price: number;
}

export default function LabTests() {
  const [tests, setTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingTest, setEditingTest] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();
  }, []);

  const [form, setForm] = useState({
    testCode: "",
    testName: "",
    category: "",
    price: "",
    description: "",
  });

  const fetchTests = async () => {
    try {
      const res = await api.get("/lab/tests");
      setTests(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const res = await api.get(`/lab/tests/${id}`);
      setEditingTest(res.data.data);

      setForm({
        testCode: res.data.data.testCode,
        testName: res.data.data.testName,
        category: res.data.data.category,
        price: res.data.data.price,
        description: res.data.data.description || "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/lab/tests/${editingTest.id}`, {
        testCode: form.testCode,
        testName: form.testName,
        category: form.category,
        price: Number(form.price),
        description: form.description,
      });

      alert("Lab Test Updated Successfully");

      setEditingTest(null);

      fetchTests();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Lab Test?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/lab/tests/${id}`);

      alert("Lab Test Deleted Successfully");

      fetchTests();
    } catch (err: any) {
      console.error(err);

      alert(err.response?.data?.message || "Unable to delete Lab Test.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Laboratory Tests</h1>

          <button
            onClick={() => navigate("/laboratory/tests/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            + Add Test
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by code or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-80"
          />
        </div>

        {editingTest && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Edit Lab Test</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                value={form.testCode}
                onChange={(e) => setForm({ ...form, testCode: e.target.value })}
                className="border p-2 rounded"
                placeholder="Test Code"
              />

              <input
                value={form.testName}
                onChange={(e) => setForm({ ...form, testName: e.target.value })}
                className="border p-2 rounded"
                placeholder="Test Name"
              />

              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border p-2 rounded"
                placeholder="Category"
              />

              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="border p-2 rounded"
                placeholder="Price"
              />

              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="border p-2 rounded col-span-2"
                placeholder="Description"
              />
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={handleUpdate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
              >
                Update
              </button>

              <button
                onClick={() => setEditingTest(null)}
                className="bg-gray-500 text-white px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-3">Code</th>

                  <th className="text-left p-3">Test Name</th>

                  <th className="text-left p-3">Category</th>

                  <th className="text-left p-3">Price</th>

                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">
                      No laboratory tests found.
                    </td>
                  </tr>
                ) : (
                  tests
                    .filter(
                      (test) =>
                        test.testName
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        test.testCode
                          .toLowerCase()
                          .includes(search.toLowerCase()),
                    )

                    .map((test) => (
                      <tr key={test.id} className="hover:bg-gray-50 transition">
                        <td className="p-3">{test.testCode}</td>

                        <td className="p-3">{test.testName}</td>

                        <td className="p-3">{test.category}</td>

                        <td className="p-3">₹{test.price.toFixed(2)}</td>

                        <td className="p-3 space-x-2">
                          <button
                            className="bg-yellow-500 px-3 py-1 rounded text-white"
                            onClick={() => handleEdit(test.id)}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(test.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
