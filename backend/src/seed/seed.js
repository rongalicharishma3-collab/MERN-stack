import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Attraction from "../models/Attraction.js";
import Blog from "../models/Blog.js";
import Event from "../models/Event.js";
import Itinerary from "../models/Itinerary.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import { attractions, blogs, events } from "./seedData.js";

dotenv.config();

await connectDB();

const adminExists = await User.findOne({
  email: "admin@explorevizag.com"
});

let admin;

if (!adminExists) {
  admin = await User.create({
    name: "Explore Vizag Admin",
    email: "admin@explorevizag.com",
    password: "Admin@123",
    role: "admin"
  });
} else {
  admin = adminExists;
}

const userExists = await User.findOne({
  email: "user@explorevizag.com"
});

if (!userExists) {
  await User.create({
    name: "Vizag Traveler",
    email: "user@explorevizag.com",
    password: "User@123",
    role: "user"
  });
}

if ((await Attraction.countDocuments()) === 0) {
  await Attraction.insertMany(attractions);
}

if ((await Event.countDocuments()) === 0) {
  await Event.insertMany(events);
}

if ((await Blog.countDocuments()) === 0) {
  await Blog.insertMany(
    blogs.map((blog) => ({
      ...blog,
      author: admin._id
    }))
  );
}