import mongoose from "mongoose";

const itineraryDaySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    notes: { type: String, default: "" },
    attractions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attraction" }]
  },
  { _id: false }
);

const itinerarySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    startDate: Date,
    endDate: Date,
    days: [itineraryDaySchema],
    notes: { type: String, default: "" }
  },
  { timestamps: true }
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;
