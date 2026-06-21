import Itinerary from "../models/Itinerary.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getMyItineraries = asyncHandler(async (req, res) => {
  const itineraries = await Itinerary.find({ user: req.user._id })
    .populate("days.attractions")
    .sort("-createdAt");
  res.json(itineraries);
});

export const getItineraryById = asyncHandler(async (req, res) => {
  const itinerary = await Itinerary.findById(req.params.id).populate("days.attractions");
  if (!itinerary) {
    res.status(404);
    throw new Error("Itinerary not found");
  }

  if (itinerary.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You cannot view this itinerary");
  }

  res.json(itinerary);
});

export const createItinerary = asyncHandler(async (req, res) => {
  const itinerary = await Itinerary.create({ ...req.body, user: req.user._id });
  res.status(201).json(itinerary);
});

export const updateItinerary = asyncHandler(async (req, res) => {
  const itinerary = await Itinerary.findById(req.params.id);
  if (!itinerary) {
    res.status(404);
    throw new Error("Itinerary not found");
  }

  if (itinerary.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can update only your own itinerary");
  }

  Object.assign(itinerary, req.body);
  res.json(await itinerary.save());
});

export const deleteItinerary = asyncHandler(async (req, res) => {
  const itinerary = await Itinerary.findById(req.params.id);
  if (!itinerary) {
    res.status(404);
    throw new Error("Itinerary not found");
  }

  if (itinerary.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You can delete only your own itinerary");
  }

  await itinerary.deleteOne();
  res.json({ message: "Itinerary deleted" });
});
