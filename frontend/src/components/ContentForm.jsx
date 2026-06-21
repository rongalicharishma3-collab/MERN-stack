import { useEffect, useState } from "react";

export default function ContentForm({
  fields,
  initial = {},
  onSubmit,
  submitLabel = "Save",
}) {
  const [form, setForm] = useState(initial);

  useEffect(() => {
    setForm(initial);
  }, [initial]);

  const update = (name, value) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  return (
    <form
      className="card grid gap-4 p-5 md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
        setForm(initial);
      }}
    >
      {fields.map((field) => (
        <label
          key={field.name}
          className={field.large ? "md:col-span-2" : ""}
        >
          <span className="mb-1 block text-sm font-semibold">
            {field.label}
          </span>

          {/* SELECT FIELD */}
          {field.type === "select" ? (
            <select
              className="input"
              value={form[field.name] || ""}
              onChange={(event) =>
                update(field.name, event.target.value)
              }
              required={field.required}
            >
              <option value="">Select {field.label}</option>

              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            /* TEXTAREA FIELD */
            <textarea
              className="input min-h-28"
              value={form[field.name] || ""}
              onChange={(event) =>
                update(field.name, event.target.value)
              }
              required={field.required}
            />
          ) : (
            /* INPUT FIELD */
            <input
              className="input"
              type={field.type || "text"}
              value={form[field.name] || ""}
              onChange={(event) =>
                update(field.name, event.target.value)
              }
              required={field.required}
            />
          )}
        </label>
      ))}

      <div className="md:col-span-2">
        <button className="btn-primary" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}