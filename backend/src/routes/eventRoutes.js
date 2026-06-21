import express from "express";
import { createEvent, deleteEvent, getEventById, getEvents, getUpcomingEvents, updateEvent } from "../controllers/eventController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/:id", getEventById);
router.post("/", protect, authorize("admin"), upload.single("image"), createEvent);
router.put("/:id", protect, authorize("admin"), upload.single("image"), updateEvent);
router.delete("/:id", protect, authorize("admin"), deleteEvent);

export default router;
