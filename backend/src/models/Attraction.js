import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ["Beach", "Nature", "Temple", "Museum", "Park"]
    },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    timings: { type: String, default: "Open all day" },
    entryFee: { type: String, default: "Free" },
    bestTimeToVisit: { type: String, default: "October to March" },
    images: [{ type: String }],
    mapUrl: { type: String, default: "" },
    latitude: Number,
    longitude: Number,
    highlights: [{ type: String }],
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const Attraction = mongoose.model("Attraction", attractionSchema);

export default Attraction;
