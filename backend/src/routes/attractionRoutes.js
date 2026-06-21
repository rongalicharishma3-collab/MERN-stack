import express from "express";
import {
  createAttraction,
  deleteAttraction,
  getAttractionById,
  getAttractions,
  getFeaturedAttractions,
  toggleFavorite,
  updateAttraction
} from "../controllers/attractionController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAttractions);
router.get("/featured", getFeaturedAttractions);
router.get("/:id", getAttractionById);
router.post("/", protect, authorize("admin"), upload.array("images", 8), createAttraction);
router.put("/:id", protect, authorize("admin"), upload.array("images", 8), updateAttraction);
router.delete("/:id", protect, authorize("admin"), deleteAttraction);
router.post("/:id/favorite", protect, toggleFavorite);

export default router;
