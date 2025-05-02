const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: String,
    headquarters: String,
    size: {
      min: Number,
      max: Number,
    },
    ownershipType: String,
    industry: String,
    sector: String,
    revenue: {
      type: String,
      default: null,
    },
    foundingYear: Number,
  },
  {
    collection: "company",
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
