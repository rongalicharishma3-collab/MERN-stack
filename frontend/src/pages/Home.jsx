import { CalendarDays, Mail, MapPinned, Quote, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AttractionCard from "../components/AttractionCard.jsx";
import api from "../services/api.js";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/attractions/featured"),
      api.get("/events/upcoming")
    ]).then(([a, e]) => {
      setFeatured(a.data);
      setEvents(e.data);
    });
  }, []);

  return (
    <>
      <section className="relative min-h-[560px] bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(10, 20, 30, 0.45), rgba(10, 20, 30, 0.35)), url('https://content.r9cdn.net/rimg/dimg/4b/08/e30921a2-city-33567-172ca7cf26b.jpg?width=1366&height=768&xhint=3323&yhint=2242&crop=true')" }}>
        <div className="page flex min-h-[560px] flex-col justify-center text-white">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-200">Visakhapatnam Tourism</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold sm:text-6xl">Explore Vizag</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-100">Discover beaches, hill views, heritage stops, festivals, food trails, and weekend plans across the City of Destiny.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary bg-coral hover:bg-orange-700" to="/attractions">Explore Attractions</Link>
            <Link className="btn-secondary border-white/70 bg-white/95" to="/trip-planner">Plan My Trip</Link>
            <Link className="btn-secondary border-white/70 bg-white/95" to="/events">Upcoming Events</Link>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">Featured Attractions</h2>
            <p className="text-slate-600">Start with the most-loved places around Vizag.</p>
          </div>
          <Link className="btn-secondary gap-2" to="/attractions"><Search className="h-4 w-4" />Browse All</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => <AttractionCard key={item._id} attraction={item} />)}
        </div>
      </section>

      <section className="bg-white">
        <div className="page grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold">Upcoming Events</h2>
            <div className="mt-5 grid gap-4">
              {events.map((event) => (
                <Link key={event._id} to={`/events`} className="card flex gap-4 p-4 transition hover:border-ocean">
                  <img className="h-24 w-28 rounded-md object-cover" src={event.image} alt={event.title} />
                  <div>
                    <p className="flex items-center gap-1 text-xs font-semibold uppercase text-coral"><CalendarDays className="h-4 w-4" />{new Date(event.startDate).toLocaleDateString()}</p>
                    <h3 className="mt-1 font-bold">{event.title}</h3>
                    <p className="text-sm text-slate-600">{event.venue}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold">Trip Planner</h2>
            <div className="card mt-5 p-6">
              <MapPinned className="h-9 w-9 text-ocean" />
              <h3 className="mt-4 text-xl font-extrabold">Build a custom Vizag itinerary</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Choose your travel dates, preferred places, transport mode, guide requirement, and stay type. The planner turns your inputs into a clean day-wise trip layout.
              </p>
              <Link className="btn-primary mt-5" to="/trip-planner">Open Trip Planner</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <Quote className="h-8 w-8 text-coral" />
          <p className="mt-4 text-lg font-semibold">Vizag is the rare city where a morning beach walk and an evening hilltop view can fit into the same relaxed day.</p>
          <p className="mt-3 text-sm text-slate-500">Traveler testimonial</p>
        </div>
        <form className="card p-6">
          <Mail className="h-8 w-8 text-ocean" />
          <h2 className="mt-3 text-2xl font-extrabold">Newsletter</h2>
          <p className="mt-2 text-slate-600">Get seasonal trip ideas, event picks, and itinerary updates.</p>
          <div className="mt-5 flex gap-2">
            <input className="input" type="email" placeholder="you@example.com" />
            <button className="btn-primary" type="button">Subscribe</button>
          </div>
        </form>
      </section>
    </>
  );
}
