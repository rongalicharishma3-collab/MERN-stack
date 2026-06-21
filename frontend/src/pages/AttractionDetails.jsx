import { Clock, IndianRupee, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AttractionDetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [attraction, setAttraction] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: "" });

  const load = () => api.get(`/attractions/${id}`).then(({ data }) => setAttraction(data));

  useEffect(() => {
    load();
  }, [id]);

  const submitReview = async (event) => {
    event.preventDefault();
    await api.post(`/reviews/attractions/${id}`, review);
    setReview({ rating: 5, comment: "" });
    load();
  };

  if (!attraction) return <section className="page">Loading...</section>;

  return (
    <section className="page">
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <img className="h-[420px] w-full rounded-lg object-cover" src={attraction.images?.[0]} alt={attraction.name} />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {attraction.images?.slice(0, 3).map((image) => <img key={image} className="h-32 w-full rounded-md object-cover" src={image} alt={attraction.name} />)}
          </div>
        </div>
        <aside className="card p-6">
          <p className="text-sm font-bold uppercase text-coral">{attraction.category}</p>
          <h1 className="mt-2 text-3xl font-extrabold">{attraction.name}</h1>
          <p className="mt-3 text-slate-600">{attraction.description}</p>
          <div className="mt-5 grid gap-3 text-sm">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-ocean" />{attraction.address}</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-ocean" />{attraction.timings}</span>
            <span className="flex items-center gap-2"><IndianRupee className="h-4 w-4 text-ocean" />{attraction.entryFee}</span>
            <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{Number(attraction.averageRating).toFixed(1)} from {attraction.reviewCount} reviews</span>
          </div>
          <a className="btn-primary mt-6 w-full" href={attraction.mapUrl} target="_blank" rel="noreferrer">Open Map</a>
        </aside>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.7fr_1fr]">
        <div className="card p-5">
          <h2 className="text-xl font-extrabold">Add Review</h2>
          {isAuthenticated ? (
            <form className="mt-4 grid gap-3" onSubmit={submitReview}>
              <select className="input" value={review.rating} onChange={(event) => setReview({ ...review, rating: Number(event.target.value) })}>
                {[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}
              </select>
              <textarea className="input min-h-28" placeholder="Share your experience" value={review.comment} onChange={(event) => setReview({ ...review, comment: event.target.value })} required />
              <button className="btn-primary">Post Review</button>
            </form>
          ) : (
            <p className="mt-3 text-sm text-slate-600">Login to add your review.</p>
          )}
        </div>
        <div className="card p-5">
          <h2 className="text-xl font-extrabold">Reviews</h2>
          <div className="mt-4 grid gap-4">
            {attraction.reviews?.map((item) => (
              <div key={item._id} className="rounded-md border border-slate-200 p-4">
                <div className="flex justify-between gap-3">
                  <strong>{item.user?.name}</strong>
                  <span className="text-sm text-amber-600">{item.rating} stars</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
