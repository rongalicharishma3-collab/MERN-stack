import asyncHandler from "../utils/asyncHandler.js";
import { uploadManyToCloudinary } from "../utils/uploadToCloudinary.js";

export const uploadImages = asyncHandler(async (req, res) => {
  const urls = await uploadManyToCloudinary(req.files || [], "explore-vizag/uploads");
  res.status(201).json({ urls });
});
