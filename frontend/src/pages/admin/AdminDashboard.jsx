import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard.jsx";
import api from "../../services/api.js";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard/admin").then(({ data }) => setData(data));
  }, []);

  const totals = data?.totals || {};

  return (
    <section className="page">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
          <p className="text-slate-600">Manage tourism content, users, and platform activity.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn-secondary" to="/admin/users">Users</Link>
          <Link className="btn-secondary" to="/admin/attractions">Attractions</Link>
          <Link className="btn-secondary" to="/admin/events">Events</Link>
        </div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Users" value={totals.users} />
        <StatCard label="Attractions" value={totals.attractions} />
        <StatCard label="Events" value={totals.events} />
        <StatCard label="Reviews" value={totals.reviews} />
        <StatCard label="Itineraries" value={totals.itineraries} />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="text-xl font-extrabold">Latest Users</h2>
          <div className="mt-4 grid gap-3">
            {data?.latestUsers?.map((user) => (
              <div key={user._id} className="flex items-center justify-between rounded-md border border-slate-200 p-3 text-sm">
                <span>{user.name}</span>
                <span className="font-semibold text-ocean">{user.role}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="text-xl font-extrabold">Top Attractions</h2>
          <div className="mt-4 grid gap-3">
            {data?.topAttractions?.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-md border border-slate-200 p-3 text-sm">
                <span>{item.name}</span>
                <span className="font-semibold text-coral">{Number(item.averageRating).toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
