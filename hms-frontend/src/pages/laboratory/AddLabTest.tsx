import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../lib/api";

export default function AddLabTest() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    testCode: "",
    testName: "",
    category: "",
    price: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await api.post("/lab/tests", {
        ...form,
        price: Number(form.price),
      });

      alert("Lab Test Created Successfully");

      navigate("/laboratory/tests");
    } catch (err) {
      console.error(err);
      alert("Failed to create Lab Test");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-8">
          Add Laboratory Test
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            name="testCode"
            placeholder="Test Code"
            value={form.testCode}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="testName"
            placeholder="Test Name"
            value={form.testName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows={4}
          />

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Save Lab Test
          </button>

        </form>

      </div>
    </DashboardLayout>
  );
}