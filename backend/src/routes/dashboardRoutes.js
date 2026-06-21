import express from "express";
import { getAdminDashboard, getUserDashboard } from "../controllers/dashboardController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/user", protect, getUserDashboard);
router.get("/admin", protect, authorize("admin"), getAdminDashboard);

export default router;
