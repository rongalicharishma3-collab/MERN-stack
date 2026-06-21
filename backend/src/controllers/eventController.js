import Event from "../models/Event.js";
import asyncHandler from "../utils/asyncHandler.js";
import slugify from "../utils/slugify.js";
import { uploadBufferToCloudinary } from "../utils/uploadToCloudinary.js";

export const getEvents = asyncHandler(async (req, res) => {
  const filter = req.query.category && req.query.category !== "All" ? { category: req.query.category } : {};
  const events = await Event.find({ ...filter, isPublished: true }).sort("startDate");
  res.json(events);
});

export const getUpcomingEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ startDate: { $gte: new Date() }, isPublished: true })
    .sort("startDate")
    .limit(6);
  res.json(events);
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  res.json(event);
});

export const createEvent = asyncHandler(async (req, res) => {
  const image = req.file
    ? await uploadBufferToCloudinary(req.file.buffer, "explore-vizag/events")
    : req.body.image || "";

  const event = await Event.create({
    ...req.body,
    image,
    slug: req.body.slug || slugify(req.body.title)
  });

  res.status(201).json(event);
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  Object.assign(event, req.body);
  if (req.file) event.image = await uploadBufferToCloudinary(req.file.buffer, "explore-vizag/events");
  if (req.body.title && !req.body.slug) event.slug = slugify(req.body.title);

  res.json(await event.save());
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }

  await event.deleteOne();
  res.json({ message: "Event deleted" });
});
