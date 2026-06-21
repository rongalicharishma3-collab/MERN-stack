import express from "express";
import {
  createItinerary,
  deleteItinerary,
  getItineraryById,
  getMyItineraries,
  updateItinerary
} from "../controllers/itineraryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/my", getMyItineraries);
router.post("/", createItinerary);
router.get("/:id", getItineraryById);
router.put("/:id", updateItinerary);
router.delete("/:id", deleteItinerary);

export default router;
