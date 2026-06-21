import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Compass, Heart, LayoutDashboard, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  ["Home", "/"],
  ["Attractions", "/attractions"],
  ["Trip Planner", "/trip-planner"],
  ["Events", "/events"],
  ["About", "/about"],
  ["Contact", "/contact"]
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-teal-50 text-ocean" : "text-slate-700 hover:bg-slate-100"}`;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-ink">
            <Compass className="h-6 w-6 text-ocean" />
            Explore Vizag
          </Link>
          <button className="rounded-md p-2 md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
            <Menu className="h-5 w-5" />
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(([label, path]) => (
              <NavLink key={path} to={path} className={linkClass}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <Link className="btn-secondary gap-2" to={isAdmin ? "/admin" : "/dashboard"}>
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link className="rounded-md p-2 text-slate-700 hover:bg-slate-100" to="/favorites" aria-label="Favorites">
                  <Heart className="h-5 w-5" />
                </Link>
                <Link className="rounded-md p-2 text-slate-700 hover:bg-slate-100" to="/profile" aria-label="Profile">
                  <User className="h-5 w-5" />
                </Link>
                <button
                  className="rounded-md p-2 text-slate-700 hover:bg-slate-100"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link className="btn-secondary" to="/login">Login</Link>
                <Link className="btn-primary" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
        {open && (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navItems.map(([label, path]) => (
                <NavLink key={path} to={path} className={linkClass} onClick={() => setOpen(false)}>
                  {label}
                </NavLink>
              ))}
              <Link className="btn-primary mt-2" to={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)}>
                {user ? "Dashboard" : "Login"}
              </Link>
            </div>
          </div>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="page grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-lg font-extrabold">Explore Vizag</div>
            <p className="mt-2 text-sm text-slate-600">Plan beaches, hills, temples, food trails, and weekends across Visakhapatnam.</p>
          </div>
          <div className="text-sm text-slate-600">Beach Road, Visakhapatnam, Andhra Pradesh</div>
          <div className="text-sm text-slate-600 md:text-right">Made for travelers, locals, and curious planners.</div>
        </div>
      </footer>
    </div>
  );
}
