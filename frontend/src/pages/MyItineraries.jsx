import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function MyItineraries() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", notes: "" });

  const load = () => api.get("/itineraries/my").then(({ data }) => setItems(data));

  useEffect(() => {
    load();
  }, []);

  const create = async (event) => {
    event.preventDefault();
    await api.post("/itineraries", { ...form, days: [{ day: 1, title: "Day 1", notes: form.notes, attractions: [] }] });
    setForm({ title: "", notes: "" });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/itineraries/${id}`);
    load();
  };

  return (
    <section className="page">
      <h1 className="text-3xl font-extrabold">My Itineraries</h1>
      <form className="card mt-6 grid gap-3 p-5 md:grid-cols-[1fr_1fr_auto]" onSubmit={create}>
        <input className="input" placeholder="Trip title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
        <input className="input" placeholder="Notes" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
        <button className="btn-primary">Create</button>
      </form>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item._id} className="card p-5">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.notes || item.days?.[0]?.notes}</p>
            <button className="btn-secondary mt-4" onClick={() => remove(item._id)}>Delete</button>
          </article>
        ))}
      </div>
    </section>
  );
}
