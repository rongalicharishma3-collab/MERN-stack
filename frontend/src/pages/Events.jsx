import { CalendarDays, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then(({ data }) => setEvents(data));
  }, []);

  return (
    <section className="page">
      <h1 className="text-3xl font-extrabold">Events</h1>
      <p className="mt-1 text-slate-600">Upcoming beach walks, culture, food, music, and weekend experiences.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {events.map((event) => (
          <article key={event._id} className="card overflow-hidden">
            <img className="h-56 w-full object-cover" src={event.image} alt={event.title} />
            <div className="p-5">
              <p className="text-xs font-bold uppercase text-coral">{event.category}</p>
              <h2 className="mt-2 text-xl font-extrabold">{event.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{event.description}</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{new Date(event.startDate).toLocaleString()}</span>
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.venue}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
