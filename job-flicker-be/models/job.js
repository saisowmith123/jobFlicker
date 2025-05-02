const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobUser",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    salaryEstimation: {
      min: Number,
      max: Number,
      avg: Number,
    },
    rating: {
      type: Number,
    },
    location: {
      type: String,
    },
    jobState: {
      type: String,
    },
    sameState: {
      type: Boolean,
    },
    companyAge: {
      type: Number,
    },
    jobType: {
      type: String,
    },
    seniority: {
      type: Boolean,
    },
    skills: {
      type: [String],
    },
    benefits: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "job",
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
