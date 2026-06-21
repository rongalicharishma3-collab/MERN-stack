import cloudinary from "../config/cloudinary.js";

export const uploadBufferToCloudinary = (fileBuffer, folder = "explore-vizag") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};

export const uploadManyToCloudinary = async (files = [], folder) => {
  return Promise.all(files.map((file) => uploadBufferToCloudinary(file.buffer, folder)));
};
