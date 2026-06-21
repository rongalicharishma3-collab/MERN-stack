import { CalendarDays, Car, Check, Hotel, MapPinned, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../services/api.js";

const placeGroups = [
  {
    category: "Temples",
    places: ["Simhachalam", "Kanaka Maha Lakshmi", "Sri Sampath Vinayagar"]
  },
  {
    category: "Beaches",
    places: ["RK Beach", "Yarada Beach", "Rushikonda"]
  },
  {
    category: "Parks & Nature",
    places: ["Kailasagiri", "Kambalakonda", "Zoo Park"]
  },
  {
    category: "Hill Stations",
    places: ["Araku", "Lambasingi", "Ananthagiri"]
  },
  {
    category: "Caves & Waterfalls",
    places: ["Borra Caves", "Katiki Waterfalls"]
  }
];

const transportModes = ["Own Vehicle", "Rental Car", "Public Transport (Bus/Train)", "Cab / Taxi", "Bike Rental"];
const accommodations = ["Not Required", "Hotel", "Budget Stay", "Resort"];

const addDays = (dateValue, days) => {
  if (!dateValue || !days) return "";
  const date = new Date(dateValue);
  date.setDate(date.getDate() + Number(days) - 1);
  return date.toISOString().slice(0, 10);
};

export default function TripPlanner() {
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    contact: "",
    numberOfDays: 2,
    startDate: "",
    endDate: "",
    categories: [],
    transportMode: "Own Vehicle",
    needsGuide: false,
    accommodation: "Not Required"
  });
  const [plan, setPlan] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (form.startDate) {
      setForm((current) => ({ ...current, endDate: addDays(current.startDate, current.numberOfDays) }));
    }
  }, [form.startDate, form.numberOfDays]);

  const selectedPlaces = useMemo(() => {
    return placeGroups
      .filter((group) => form.categories.includes(group.category))
      .flatMap((group) => group.places.map((place) => ({ place, category: group.category })));
  }, [form.categories]);

  const toggleCategory = (category) => {
    setForm((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category]
    }));
  };

  const buildPlan = () => {
    const days = Array.from({ length: Number(form.numberOfDays) }, (_, index) => ({
      day: index + 1,
      title: `Day ${index + 1}`,
      places: [],
      notes: ""
    }));

    selectedPlaces.forEach((item, index) => {
      days[index % days.length].places.push(item);
    });

    return {
      ...form,
      days: days.map((day) => ({
        ...day,
        notes:
          day.places.length > 0
            ? `Travel by ${form.transportMode}. ${form.needsGuide ? "Guide requested." : "Self-guided plan."}`
            : "Keep this day flexible for food, rest, or local shopping."
      }))
    };
  };

  const submit = (event) => {
    event.preventDefault();
    setSaved(false);
    setPlan(buildPlan());
  };

  const savePlan = async () => {
    if (!plan || !isAuthenticated) return;
    await api.post("/itineraries", {
      title: `${plan.fullName || "My"} Vizag Trip`,
      startDate: plan.startDate,
      endDate: plan.endDate,
      notes: `Contact: ${plan.contact || "Not provided"} | Transport: ${plan.transportMode} | Guide: ${plan.needsGuide ? "Yes" : "No"} | Stay: ${plan.accommodation}`,
      days: plan.days.map((day) => ({
        day: day.day,
        title: day.title,
        notes: `${day.places.map((item) => item.place).join(", ") || "Flexible day"} - ${day.notes}`,
        attractions: []
      }))
    });
    setSaved(true);
  };

  return (
    <section className="page">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase text-coral">Customized Itinerary</p>
        <h1 className="mt-2 text-3xl font-extrabold">Trip Planner</h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          Enter your travel preferences and generate a structured Vizag trip plan with day-wise places, transport, guide, and accommodation choices.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form className="card grid gap-5 p-5" onSubmit={submit}>
          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold"><UserRound className="h-5 w-5 text-ocean" />Personal Details</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input className="input" placeholder="Full Name" value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required />
              <input className="input" placeholder="Email / Phone Number (optional)" value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} />
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold"><CalendarDays className="h-5 w-5 text-ocean" />Trip Details</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <select className="input" value={form.numberOfDays} onChange={(event) => setForm({ ...form, numberOfDays: Number(event.target.value) })}>
                {[1, 2, 3, 4, 5, 6, 7].map((day) => <option key={day} value={day}>{day} {day === 1 ? "day" : "days"}</option>)}
              </select>
              <input className="input" type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} required />
              <input className="input" type="date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} required />
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold"><MapPinned className="h-5 w-5 text-ocean" />Places to Visit</h2>
            <div className="mt-3 grid gap-3">
              {placeGroups.map((group) => (
                <label key={group.category} className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 bg-white p-3 hover:border-ocean">
                  <input className="mt-1" type="checkbox" checked={form.categories.includes(group.category)} onChange={() => toggleCategory(group.category)} />
                  <span>
                    <span className="block font-semibold">{group.category}</span>
                    <span className="text-sm text-slate-600">{group.places.join(", ")}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 text-lg font-extrabold"><Car className="h-5 w-5 text-ocean" />Transport Mode</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {transportModes.map((mode) => (
                <label key={mode} className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 p-3 hover:border-ocean">
                  <input type="radio" name="transport" checked={form.transportMode === mode} onChange={() => setForm({ ...form, transportMode: mode })} />
                  <span className="text-sm font-medium">{mode}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center justify-between rounded-md border border-slate-200 p-3">
              <span>
                <span className="block font-semibold">Tour Guide</span>
                <span className="text-sm text-slate-600">Do you need a tour guide?</span>
              </span>
              <input type="checkbox" checked={form.needsGuide} onChange={(event) => setForm({ ...form, needsGuide: event.target.checked })} />
            </label>
            <label>
              <span className="mb-1 flex items-center gap-2 text-sm font-semibold"><Hotel className="h-4 w-4 text-ocean" />Accommodation</span>
              <select className="input" value={form.accommodation} onChange={(event) => setForm({ ...form, accommodation: event.target.value })}>
                {accommodations.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>

          <button className="btn-primary" type="submit" disabled={form.categories.length === 0}>Generate Trip Plan</button>
        </form>

        <div className="card p-5">
          <h2 className="text-xl font-extrabold">Generated Plan</h2>
          {!plan ? (
            <p className="mt-3 text-slate-600">Your day-wise itinerary will appear here after you submit the planner form.</p>
          ) : (
            <div className="mt-5">
              <div className="rounded-md bg-teal-50 p-4">
                <h3 className="font-extrabold">{plan.fullName}'s Vizag Trip</h3>
                <p className="mt-1 text-sm text-slate-700">{plan.startDate} to {plan.endDate} | {plan.numberOfDays} days</p>
                <p className="mt-1 text-sm text-slate-700">{plan.transportMode} | Guide: {plan.needsGuide ? "Yes" : "No"} | Stay: {plan.accommodation}</p>
              </div>
              <div className="mt-5 grid gap-4">
                {plan.days.map((day) => (
                  <article key={day.day} className="rounded-md border border-slate-200 p-4">
                    <h3 className="font-bold">{day.title}</h3>
                    <div className="mt-3 grid gap-2">
                      {day.places.length ? day.places.map((item) => (
                        <div key={`${day.day}-${item.place}`} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-ocean" />
                          <span><strong>{item.place}</strong> <span className="text-slate-500">({item.category})</span></span>
                        </div>
                      )) : <p className="text-sm text-slate-600">Flexible day for rest or local food.</p>}
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{day.notes}</p>
                  </article>
                ))}
              </div>
              <button className="btn-primary mt-5" type="button" onClick={savePlan} disabled={!isAuthenticated}>
                {isAuthenticated ? "Save to My Itineraries" : "Login to Save Plan"}
              </button>
              {saved && <p className="mt-3 rounded-md bg-teal-50 p-3 text-sm text-teal-700">Trip plan saved to My Itineraries.</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
