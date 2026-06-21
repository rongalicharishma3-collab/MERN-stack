import { Heart, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function AttractionCard({ attraction, onFavorite }) {
  return (
    <article className="card overflow-hidden">
      <img
        className="h-48 w-full object-cover"
        src={attraction.images?.[0] || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"}
        alt={attraction.name}
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-coral">{attraction.category}</p>
            <h3 className="mt-1 text-lg font-bold">{attraction.name}</h3>
          </div>
          {onFavorite && (
            <button className="rounded-md border border-slate-200 p-2 hover:border-coral hover:text-coral" onClick={() => onFavorite(attraction._id)} aria-label="Save favorite">
              <Heart className="h-4 w-4" />
            </button>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{attraction.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{attraction.location}</span>
          <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{Number(attraction.averageRating || 0).toFixed(1)}</span>
        </div>
        <Link className="btn-primary mt-4 w-full" to={`/attractions/${attraction._id}`}>View Details</Link>
      </div>
    </article>
  );
}
