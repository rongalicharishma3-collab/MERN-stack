import { useEffect, useState } from "react";
import AttractionCard from "../components/AttractionCard.jsx";
import api from "../services/api.js";

export default function Favorites() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/users/favorites").then(({ data }) => setItems(data));
  }, []);

  return (
    <section className="page">
      <h1 className="text-3xl font-extrabold">Favorites</h1>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => <AttractionCard key={item._id} attraction={item} />)}
      </div>
    </section>
  );
}
