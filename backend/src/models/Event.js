import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    venue: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    image: { type: String, default: "" },
    price: { type: String, default: "Free" },
    organizer: { type: String, default: "Explore Vizag" },
    category: {
  type: String,
  enum: [
    "Temple Festival",
    "Religious",
    "Spiritual",
    "Cultural",
    "Pilgrimage"
  ],
  default: "Religious"
},
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
