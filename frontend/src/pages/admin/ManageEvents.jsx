import { useEffect, useState } from "react";
import AdminTable from "../../components/AdminTable.jsx";
import ContentForm from "../../components/ContentForm.jsx";
import api from "../../services/api.js";

const fields = [
  { name: "title", label: "Title", required: true },

  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      "Temple Festival",
      "Religious",
      "Spiritual",
      "Cultural",
      "Pilgrimage"
    ],
    required: true
  },

  { name: "venue", label: "Venue", required: true },
  { name: "price", label: "Price" },

  {
    name: "startDate",
    label: "Start Date",
    type: "datetime-local",
    required: true
  },

  {
    name: "endDate",
    label: "End Date",
    type: "datetime-local",
    required: true
  },

  { name: "image", label: "Image URL", large: true },

  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
    large: true
  }
];

export default function ManageEvents() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => api.get("/events").then(({ data }) => setItems(data));

  useEffect(() => {
    load();
  }, []);

  const create = async (form) => {
    if (editing?._id) await api.put(`/events/${editing._id}`, form);
    else await api.post("/events", form);
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    await api.delete(`/events/${id}`);
    load();
  };

  return (
    <section className="page">
      <h1 className="text-3xl font-extrabold">Manage Events</h1>
      <div className="mt-6"><ContentForm fields={fields} initial={editing || {}} onSubmit={create} submitLabel={editing ? "Update Event" : "Create Event"} /></div>
      <div className="mt-6">
        <AdminTable
          columns={[
            { key: "title", label: "Title" },
            { key: "venue", label: "Venue" },
            { key: "startDate", label: "Date", render: (row) => new Date(row.startDate).toLocaleDateString() }
          ]}
          rows={items}
          renderActions={(row) => (
            <div className="flex gap-2">
              <button
                className="btn-secondary"
                onClick={() =>
                  setEditing({
                    ...row,
                    startDate: row.startDate?.slice(0, 16),
                    endDate: row.endDate?.slice(0, 16)
                  })
                }
              >
                Edit
              </button>
              <button className="btn-secondary" onClick={() => remove(row._id)}>Delete</button>
            </div>
          )}
        />
      </div>
    </section>
  );
}
