import Attraction from "../models/Attraction.js";
import Blog from "../models/Blog.js";
import Event from "../models/Event.js";
import Itinerary from "../models/Itinerary.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUserDashboard = asyncHandler(async (req, res) => {
  const [favorites, reviews, itineraries] = await Promise.all([
    User.findById(req.user._id).populate("favorites"),
    Review.countDocuments({ user: req.user._id }),
    Itinerary.countDocuments({ user: req.user._id })
  ]);

  res.json({
    favoriteCount: favorites.favorites.length,
    reviewCount: reviews,
    itineraryCount: itineraries,
    favorites: favorites.favorites.slice(0, 4)
  });
});

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const [users, attractions, blogs, events, reviews, itineraries] = await Promise.all([
    User.countDocuments(),
    Attraction.countDocuments(),
    Blog.countDocuments(),
    Event.countDocuments(),
    Review.countDocuments(),
    Itinerary.countDocuments()
  ]);

  const latestUsers = await User.find().select("-password").sort("-createdAt").limit(5);
  const topAttractions = await Attraction.find().sort("-averageRating").limit(5);

  res.json({
    totals: { users, attractions, blogs, events, reviews, itineraries },
    latestUsers,
    topAttractions
  });
});
