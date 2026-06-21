import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", avatar: user?.avatar || "" });
  const [saved, setSaved] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    const { data } = await api.put("/auth/profile", form);
    setUser(data);
    setSaved(true);
  };

  return (
    <section className="page max-w-2xl">
      <form className="card grid gap-4 p-6" onSubmit={submit}>
        <h1 className="text-2xl font-extrabold">Profile</h1>
        {saved && <p className="rounded-md bg-teal-50 p-3 text-sm text-teal-700">Profile updated.</p>}
        <input className="input" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Name" />
        <input className="input" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} placeholder="Phone" />
        <input className="input" value={form.avatar} onChange={(event) => setForm({ ...form, avatar: event.target.value })} placeholder="Avatar URL" />
        <button className="btn-primary">Save Profile</button>
      </form>
    </section>
  );
}
