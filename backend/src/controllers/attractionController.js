import Attraction from "../models/Attraction.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { buildAttractionQuery, getPagination } from "../utils/apiFeatures.js";
import slugify from "../utils/slugify.js";
import { uploadManyToCloudinary } from "../utils/uploadToCloudinary.js";

const normalizeImages = async (req) => {
  const uploaded = req.files?.length ? await uploadManyToCloudinary(req.files, "explore-vizag/attractions") : [];
  const bodyImages = req.body.images ? [].concat(req.body.images) : [];
  return [...bodyImages, ...uploaded].filter(Boolean);
};

export const getAttractions = asyncHandler(async (req, res) => {
  const filter = buildAttractionQuery(req.query);
  const { page, limit, skip } = getPagination(req.query);
  const sort = req.query.sort || "-createdAt";

  const [items, total] = await Promise.all([
    Attraction.find(filter).sort(sort).skip(skip).limit(limit),
    Attraction.countDocuments(filter)
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
});

export const getFeaturedAttractions = asyncHandler(async (req, res) => {
  const items = await Attraction.find({ isFeatured: true }).sort("-averageRating").limit(6);
  res.json(items);
});

export const getAttractionById = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.id);
  if (!attraction) {
    res.status(404);
    throw new Error("Attraction not found");
  }

  const reviews = await Review.find({ attraction: attraction._id })
    .populate("user", "name avatar")
    .sort("-createdAt");

  res.json({ ...attraction.toObject(), reviews });
});

export const createAttraction = asyncHandler(async (req, res) => {
  const images = await normalizeImages(req);
  const attraction = await Attraction.create({
    ...req.body,
    slug: req.body.slug || slugify(req.body.name),
    images,
    highlights: req.body.highlights ? [].concat(req.body.highlights) : []
  });

  res.status(201).json(attraction);
});

export const updateAttraction = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.id);
  if (!attraction) {
    res.status(404);
    throw new Error("Attraction not found");
  }

  const images = await normalizeImages(req);
  Object.assign(attraction, req.body);
  if (req.body.name && !req.body.slug) attraction.slug = slugify(req.body.name);
  if (images.length) attraction.images = images;
  if (req.body.highlights) attraction.highlights = [].concat(req.body.highlights);

  res.json(await attraction.save());
});

export const deleteAttraction = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.id);
  if (!attraction) {
    res.status(404);
    throw new Error("Attraction not found");
  }

  await Review.deleteMany({ attraction: attraction._id });
  await User.updateMany({}, { $pull: { favorites: attraction._id } });
  await attraction.deleteOne();
  res.json({ message: "Attraction deleted" });
});

export const toggleFavorite = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.id);
  if (!attraction) {
    res.status(404);
    throw new Error("Attraction not found");
  }

  const user = await User.findById(req.user._id);
  const isFavorite = user.favorites.some((item) => item.toString() === attraction._id.toString());

  if (isFavorite) {
    user.favorites.pull(attraction._id);
  } else {
    user.favorites.push(attraction._id);
  }

  await user.save();
  res.json({ isFavorite: !isFavorite, favorites: user.favorites });
});
