import Attraction from "../models/Attraction.js";
import Review from "../models/Review.js";
import asyncHandler from "../utils/asyncHandler.js";

const recalculateRating = async (attractionId) => {
  const stats = await Review.aggregate([
    { $match: { attraction: attractionId } },
    { $group: { _id: "$attraction", averageRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } }
  ]);

  await Attraction.findByIdAndUpdate(attractionId, {
    averageRating: stats[0]?.averageRating || 0,
    reviewCount: stats[0]?.reviewCount || 0
  });
};

export const createReview = asyncHandler(async (req, res) => {
  const attraction = await Attraction.findById(req.params.attractionId);
  if (!attraction) {
    res.status(404);
    throw new Error("Attraction not found");
  }

  const review = await Review.create({
    user: req.user._id,
    attraction: attraction._id,
    rating: req.body.rating,
    comment: req.body.comment
  });

  await recalculateRating(attraction._id);
  res.status(201).json(await review.populate("user", "name avatar"));
});

export const getReviewsForAttraction = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ attraction: req.params.attractionId })
    .populate("user", "name avatar")
    .sort("-createdAt");
  res.json(reviews);
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  const ownsReview = review.user.toString() === req.user._id.toString();
  if (!ownsReview && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You can delete only your own reviews");
  }

  const attractionId = review.attraction;
  await review.deleteOne();
  await recalculateRating(attractionId);
  res.json({ message: "Review deleted" });
});
