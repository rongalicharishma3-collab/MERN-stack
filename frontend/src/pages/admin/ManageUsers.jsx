import { useEffect, useState } from "react";
import AdminTable from "../../components/AdminTable.jsx";
import api from "../../services/api.js";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const load = () => api.get("/users").then(({ data }) => setUsers(data));

  useEffect(() => {
    load();
  }, []);

  const toggleRole = async (user) => {
    await api.put(`/users/${user._id}/role`, { role: user.role === "admin" ? "user" : "admin" });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/users/${id}`);
    load();
  };

  return (
    <section className="page">
      <h1 className="text-3xl font-extrabold">Manage Users</h1>
      <div className="mt-6">
        <AdminTable
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" }
          ]}
          rows={users}
          renderActions={(user) => (
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => toggleRole(user)}>Toggle Role</button>
              <button className="btn-secondary" onClick={() => remove(user._id)}>Delete</button>
            </div>
          )}
        />
      </div>
    </section>
  );
}
