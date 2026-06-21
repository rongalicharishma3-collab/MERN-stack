export const buildAttractionQuery = (query) => {
  const filter = {};

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { location: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } }
    ];
  }

  if (query.category && query.category !== "All") {
    filter.category = query.category;
  }

  if (query.minRating) {
    filter.averageRating = { $gte: Number(query.minRating) };
  }

  return filter;
};

export const getPagination = (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 8, 1), 50);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};
