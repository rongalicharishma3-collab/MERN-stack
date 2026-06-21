import Blog from "../models/Blog.js";
import asyncHandler from "../utils/asyncHandler.js";
import slugify from "../utils/slugify.js";
import { uploadBufferToCloudinary } from "../utils/uploadToCloudinary.js";

export const getBlogs = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 9;
  const filter = req.query.search
    ? { title: { $regex: req.query.search, $options: "i" }, isPublished: true }
    : { isPublished: true };

  const [items, total] = await Promise.all([
    Blog.find(filter).populate("author", "name").sort("-createdAt").skip((page - 1) * limit).limit(limit),
    Blog.countDocuments(filter)
  ]);

  res.json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
});

export const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author", "name avatar");
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  res.json(blog);
});

export const createBlog = asyncHandler(async (req, res) => {
  const coverImage = req.file
    ? await uploadBufferToCloudinary(req.file.buffer, "explore-vizag/blogs")
    : req.body.coverImage || "";

  const blog = await Blog.create({
    ...req.body,
    coverImage,
    slug: req.body.slug || slugify(req.body.title),
    tags: req.body.tags ? [].concat(req.body.tags) : [],
    author: req.user._id
  });

  res.status(201).json(blog);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  Object.assign(blog, req.body);
  if (req.file) blog.coverImage = await uploadBufferToCloudinary(req.file.buffer, "explore-vizag/blogs");
  if (req.body.title && !req.body.slug) blog.slug = slugify(req.body.title);
  if (req.body.tags) blog.tags = [].concat(req.body.tags);

  res.json(await blog.save());
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
});
