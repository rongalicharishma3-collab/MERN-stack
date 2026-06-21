import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import About from "./pages/About.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageAttractions from "./pages/admin/ManageAttractions.jsx";
import ManageEvents from "./pages/admin/ManageEvents.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import AttractionDetails from "./pages/AttractionDetails.jsx";
import Attractions from "./pages/Attractions.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Events from "./pages/Events.jsx";
import Favorites from "./pages/Favorites.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyItineraries from "./pages/MyItineraries.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";
import TripPlanner from "./pages/TripPlanner.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/attractions/:id" element={<AttractionDetails />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/blogs" element={<Navigate to="/trip-planner" replace />} />
        <Route path="/blogs/:id" element={<Navigate to="/trip-planner" replace />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/my-itineraries" element={<MyItineraries />} />
        </Route>
        <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/attractions" element={<ManageAttractions />} />
          <Route path="/admin/events" element={<ManageEvents />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
