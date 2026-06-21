import { useEffect, useState } from "react";
import AdminTable from "../../components/AdminTable.jsx";
import ContentForm from "../../components/ContentForm.jsx";
import api from "../../services/api.js";

const fields = [
  { name: "name", label: "Name", required: true },
  { name: "category", label: "Category", required: true },
  { name: "location", label: "Location", required: true },
  { name: "address", label: "Address", required: true },
  { name: "shortDescription", label: "Short Description", required: true, large: true },
  { name: "description", label: "Description", type: "textarea", required: true, large: true },
  { name: "timings", label: "Timings" },
  { name: "entryFee", label: "Entry Fee" },
  { name: "images", label: "Image URL" },
  { name: "mapUrl", label: "Map URL" }
];

export default function ManageAttractions() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => api.get("/attractions?limit=50").then(({ data }) => setItems(data.items));

  useEffect(() => {
    load();
  }, []);

  const create = async (form) => {
    const payload = { ...form, images: typeof form.images === "string" ? [form.images] : form.images };
    if (editing?._id) await api.put(`/attractions/${editing._id}`, payload);
    else await api.post("/attractions", payload);
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/attractions/${id}`);
    load();
  };

  return (
    <section className="page">
      <h1 className="text-3xl font-extrabold">Manage Attractions</h1>
      <div className="mt-6">
        <ContentForm fields={fields} initial={editing || {}} onSubmit={create} submitLabel={editing ? "Update Attraction" : "Create Attraction"} />
      </div>
      <div className="mt-6">
        <AdminTable
          columns={[
            { key: "name", label: "Name" },
            { key: "category", label: "Category" },
            { key: "location", label: "Location" },
            { key: "averageRating", label: "Rating", render: (row) => Number(row.averageRating).toFixed(1) }
          ]}
          rows={items}
          renderActions={(row) => (
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={() => setEditing({ ...row, images: row.images?.[0] || "" })}>Edit</button>
              <button className="btn-secondary" onClick={() => remove(row._id)}>Delete</button>
            </div>
          )}
        />
      </div>
    </section>
  );
}
