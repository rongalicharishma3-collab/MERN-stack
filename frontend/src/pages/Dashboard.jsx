import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard.jsx";
import api from "../services/api.js";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/dashboard/user").then(({ data }) => setStats(data));
  }, []);

  return (
    <section className="page">
      <h1 className="text-3xl font-extrabold">My Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Favorites" value={stats?.favoriteCount} />
        <StatCard label="Reviews" value={stats?.reviewCount} />
        <StatCard label="Itineraries" value={stats?.itineraryCount} />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn-primary" to="/favorites">View Favorites</Link>
        <Link className="btn-secondary" to="/my-itineraries">Manage Itineraries</Link>
        <Link className="btn-secondary" to="/profile">Edit Profile</Link>
      </div>
    </section>
  );
}
