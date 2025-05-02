function buildMongoFilters(filters) {
  const mongoQuery = {};

  for (const key in filters) {
    const value = filters[key];

    if (value === null || value === undefined || value === "") continue;

    if (typeof value === "string") {
      mongoQuery[key] = { $regex: value, $options: "i" };
    } else if (typeof value === "boolean") {
      mongoQuery[key] = value;
    } else if (typeof value === "number") {
      mongoQuery[key] = value;
    } else if (
      typeof value === "object" &&
      ("$min" in value || "$max" in value)
    ) {
      mongoQuery[key] = {};
      if ("$min" in value) mongoQuery[key]["$gte"] = value["$min"];
      if ("$max" in value) mongoQuery[key]["$lte"] = value["$max"];
    } else if (Array.isArray(value)) {
      mongoQuery[key] = { $in: value };
    }
  }

  return mongoQuery;
}

module.exports = {
  buildMongoFilters,
};
