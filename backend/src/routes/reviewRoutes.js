import express from "express";
import { createReview, deleteReview, getReviewsForAttraction } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/attractions/:attractionId", getReviewsForAttraction);
router.post("/attractions/:attractionId", protect, createReview);
router.delete("/:id", protect, deleteReview);

export default router;
