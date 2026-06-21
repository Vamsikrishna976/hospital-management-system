import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("RECEPTIONIST");
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);

      alert("User deleted successfully");

      fetchUsers();
    } catch (error) {
      console.error(error);

      alert("Delete failed");
    }
  };

  const updateRole = async (id: string, role: string) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, {
        role,
      });

      alert("Role updated successfully");

      fetchUsers();
    } catch (error) {
      console.error(error);

      alert("Failed to update role");
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
        role,
      });

      alert(response.data.message);
      fetchUsers();

      setName("");
      setEmail("");
      setPassword("");
      setRole("RECEPTIONIST");
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">User Management</h1>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">Create User</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 w-full rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="border p-3 w-full rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-3 w-full rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              className="border p-3 w-full rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="DOCTOR">Doctor</option>

              <option value="RECEPTIONIST">Receptionist</option>

              <option value="MANAGEMENT">Management</option>
            </select>

            <button
              onClick={handleCreateUser}
              className="bg-blue-600 text-white px-6 py-3 rounded"
            >
              Create User
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow mt-8">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>

            <table className="w-full border">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">{user.name}</td>

                    <td className="p-3">{user.email}</td>

                    <td className="p-3">
                      <select
                        value={selectedRoles[user.id] || user.role}
                        onChange={(e) =>
                          setSelectedRoles({
                            ...selectedRoles,
                            [user.id]: e.target.value,
                          })
                        }
                        className="border p-2 rounded"
                      >
                        <option value="DOCTOR">Doctor</option>
                        <option value="RECEPTIONIST">Receptionist</option>
                        <option value="MANAGEMENT">Management</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() =>
                          updateRole(
                            user.id,
                            selectedRoles[user.id] || user.role,
                          )
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
