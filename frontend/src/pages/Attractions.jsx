import { useEffect, useState } from "react";
import AttractionCard from "../components/AttractionCard.jsx";
import api from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

const categories = ["All", "Beach", "Nature", "Temple", "Museum", "Park"];

export default function Attractions() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    api
      .get("/attractions", {
        params: {
          search,
          category,
          limit: 500,
        },
      })
      .then(({ data }) => {
        setItems(data.items);
        setVisibleCount(6);
      });
  }, [search, category]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200
      ) {
        setVisibleCount((prev) =>
          Math.min(prev + 6, items.length)
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items.length]);

  const favorite = async (id) => {
    if (!isAuthenticated) return;
    await api.post(`/attractions/${id}/favorite`);
  };

  return (
    <section className="page">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold">Attractions</h1>
        <p className="text-slate-600">
          Search beaches, viewpoints, temples, museums, and nature escapes.
        </p>
      </div>

      <div className="card mb-6 grid gap-3 p-4 md:grid-cols-[1fr_auto]">
        <input
          className="input"
          placeholder="Search by name, place, or description"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              className={
                item === category ? "btn-primary" : "btn-secondary"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items
          .slice(0, visibleCount)
          .map((item) => (
            <AttractionCard
              key={item._id}
              attraction={item}
              onFavorite={favorite}
            />
          ))}
      </div>

      {visibleCount < items.length && (
        <div className="mt-8 text-center text-slate-500">
          Scroll down to load more...
        </div>
      )}
    </section>
  );
}