import { useState, useEffect } from "react";
import axios from "axios";

type MedicineForm = {
  medicineCode: string;
  medicineName: string;
  category: string;
  stockQuantity: string | number;
  unitPrice: string | number;
  expiryDate: string;
};

export default function InventoryManagement() {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState("");

  const [form, setForm] = useState<MedicineForm>({
    medicineCode: "",
    medicineName: "",
    category: "",
    stockQuantity: "",
    unitPrice: "",
    expiryDate: "",
  });

  const fetchMedicines = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/inventory");

      setMedicines(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        stockQuantity: Number(form.stockQuantity),
        unitPrice: Number(form.unitPrice),
      };

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/inventory/${editingId}`,
          payload,
        );
      } else {
        await axios.post("http://localhost:5000/api/inventory", payload);
      }

      alert("Medicine Added");

      fetchMedicines();

      setEditingId("");

      setForm({
        medicineCode: "",
        medicineName: "",
        category: "",
        stockQuantity: "",
        unitPrice: "",
        expiryDate: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const totalMedicines = medicines.length;

  const totalStock = medicines.reduce(
    (sum, medicine) => sum + medicine.stockQuantity,
    0,
  );

  const lowStock = medicines.filter(
    (medicine) => medicine.stockQuantity < 20,
  ).length;

  const outOfStock = medicines.filter(
    (medicine) => medicine.stockQuantity === 0,
  ).length;

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.medicineName.toLowerCase().includes(search.toLowerCase()) ||
      medicine.medicineCode.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (medicine: any) => {
    setEditingId(medicine.id);

    setForm({
      medicineCode: medicine.medicineCode,
      medicineName: medicine.medicineName,
      category: medicine.category,
      stockQuantity: medicine.stockQuantity,
      unitPrice: medicine.unitPrice,
      expiryDate: medicine.expiryDate ? medicine.expiryDate.split("T")[0] : "",
    });
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/inventory/${id}`);

      fetchMedicines();

      alert("Medicine Deleted");
    } catch (error) {
      console.error(error);
    }
  };

  const expiringSoon = medicines.filter((medicine) => {
    const expiry = new Date(medicine.expiryDate);
    const today = new Date();

    const diffDays =
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays <= 30 && diffDays >= 0;
  }).length;

  const lowStockMedicines = medicines.filter(
    (medicine) => medicine.stockQuantity < 20,
  );

  const handleStockUpdate = async (id: string, type: "IN" | "OUT") => {
    const quantity = prompt(`Enter quantity for Stock ${type}`);

    if (!quantity) return;

    try {
      await axios.put(`http://localhost:5000/api/inventory/${id}/stock`, {
        quantity: Number(quantity),
        type,
      });

      fetchMedicines();

      alert("Stock Updated");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pharmacy Inventory</h1>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-600 text-white p-4 rounded-xl">
          <p>Total Medicines</p>
          <h2 className="text-3xl font-bold">{totalMedicines}</h2>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-xl">
          <p>Total Stock</p>
          <h2 className="text-3xl font-bold">{totalStock}</h2>
        </div>

        <div className="bg-orange-500 text-white p-4 rounded-xl">
          <p>Low Stock</p>
          <h2 className="text-3xl font-bold">{lowStock}</h2>
        </div>

        <div className="bg-red-600 text-white p-4 rounded-xl">
          <p>Out Of Stock</p>
          <h2 className="text-3xl font-bold">{outOfStock}</h2>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded-xl">
          <p>Expiring Soon</p>
          <h2 className="text-3xl font-bold">{expiringSoon}</h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          🚨 Low Stock Medicines
        </h2>

        {lowStockMedicines.length === 0 ? (
          <p className="text-green-600">All medicines have sufficient stock.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-red-100">
                <th className="p-3 text-left">Medicine</th>
                <th className="p-3 text-left">Stock</th>
              </tr>
            </thead>

            <tbody>
              {lowStockMedicines.map((medicine) => (
                <tr key={medicine.id} className="border-b">
                  <td className="p-3">{medicine.medicineName}</td>

                  <td className="p-3">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full">
                      {medicine.stockQuantity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Add Medicine Form */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <input
          placeholder="Medicine Code"
          className="border p-3 w-full rounded"
          value={form.medicineCode}
          onChange={(e) =>
            setForm({
              ...form,
              medicineCode: e.target.value,
            })
          }
        />

        <input
          placeholder="Medicine Name"
          className="border p-3 w-full rounded"
          value={form.medicineName}
          onChange={(e) =>
            setForm({
              ...form,
              medicineName: e.target.value,
            })
          }
        />

        <input
          placeholder="Category"
          className="border p-3 w-full rounded"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          className="border p-3 w-full rounded"
          value={form.stockQuantity}
          onChange={(e) =>
            setForm({
              ...form,
              stockQuantity: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Unit Price"
          className="border p-3 w-full rounded"
          value={form.unitPrice}
          onChange={(e) =>
            setForm({
              ...form,
              unitPrice: e.target.value,
            })
          }
        />

        <input
          type="date"
          className="border p-3 w-full rounded"
          value={form.expiryDate}
          onChange={(e) =>
            setForm({
              ...form,
              expiryDate: e.target.value,
            })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {editingId ? "Update Medicine" : "Add Medicine"}
        </button>
      </div>

      <div className="mt-6 mb-4">
        <input
          type="text"
          placeholder="Search Medicine..."
          className="border p-3 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Medicine Table */}
      <div className="mt-8 bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Medicine</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id} className="border-b">
                <td className="p-3">{medicine.medicineCode}</td>

                <td className="p-3">{medicine.medicineName}</td>

                <td className="p-3">{medicine.category}</td>

                <td
                  className={`p-3 font-bold ${
                    medicine.stockQuantity < 20
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {medicine.stockQuantity}
                </td>

                <td className="p-3">₹{medicine.unitPrice}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(medicine)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(medicine.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleStockUpdate(medicine.id, "IN")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    + Stock
                  </button>

                  <button
                    onClick={() => handleStockUpdate(medicine.id, "OUT")}
                    className="bg-orange-500 text-white px-3 py-1 rounded"
                  >
                    - Stock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
