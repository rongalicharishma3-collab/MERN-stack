import express from "express";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../controllers/blogController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, authorize("admin"), upload.single("coverImage"), createBlog);
router.put("/:id", protect, authorize("admin"), upload.single("coverImage"), updateBlog);
router.delete("/:id", protect, authorize("admin"), deleteBlog);

export default router;
