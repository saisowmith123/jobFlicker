const Job = require("../models/job");
const Application = require("../models/application");
const { buildMongoFilters } = require("../utils/jobFilter");
const mongoose = require("mongoose");

exports.filterJobs = async (req, res) => {
  try {
    const {
      filters = {},
      sortBy = "",
      page = 1,
      limit = 10,
      user_id,
    } = req.body;

    const mongoFilters = buildMongoFilters(filters);
    let sortQuery = {};

    if (sortBy === "newest") {
      sortQuery = { createdAt: -1 };
    } else if (sortBy === "oldest") {
      sortQuery = { createdAt: 1 };
    }

    let appliedJobIds = [];
    if (user_id) {
      const userApplications = await Application.find({ user_id });
      userApplications.forEach((app) => {
        appliedJobIds = appliedJobIds.concat(app.job_ids);
      });

      if (appliedJobIds.length > 0) {
        mongoFilters._id = { $nin: appliedJobIds };
      }
    }

    const jobs = await Job.find(mongoFilters)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Job.countDocuments(mongoFilters);

    res.json({
      total,
      page,
      pageSize: jobs.length,
      jobs,
    });
  } catch (err) {
    console.error("Error filtering jobs:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const jobData = req.body;

    if (!jobData.companyId || !jobData.title) {
      return res
        .status(400)
        .json({ message: "companyId and title are required" });
    }

    const newJob = new Job(jobData);
    await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      job: newJob,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updatedJob = await Job.findByIdAndUpdate(id, update, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job updated successfully", job: updatedJob });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobsByIds = async (req, res) => {
  try {
    const { ids, user_id } = req.body;

    let jobIdsToFetch = [];

    if (user_id) {
      const userIdObj = new mongoose.Types.ObjectId(user_id);
      const application = await Application.findOne({ user_id: userIdObj });

      if (
        !application ||
        !application.job_ids ||
        application.job_ids.length === 0
      ) {
        return res.status(404).json({
          message: "No jobs found for this user",
          jobs: [],
        });
      }

      // Convert ObjectIds to string
      jobIdsToFetch = application.job_ids.map((id) => id.toString());
    } else if (Array.isArray(ids) && ids.length > 0) {
      // Use the provided IDs array
      jobIdsToFetch = ids
        .filter((id) => id && id.length === 24)
        .map((id) => id.toString());
    } else {
      return res
        .status(400)
        .json({ message: "Provide either user_id or an array of job IDs" });
    }

    if (jobIdsToFetch.length === 0) {
      return res.status(400).json({ message: "No valid job IDs found" });
    }

    // Fetch jobs and populate company name
    const jobs = await Job.find({ _id: { $in: jobIdsToFetch } }).populate(
      "companyId",
      "name"
    );

    const jobsWithCompanyName = jobs.map((job) => ({
      _id: job._id,
      title: job.title,
      description: job.description,
      salaryEstimation: job.salaryEstimation,
      rating: job.rating,
      location: job.location,
      jobState: job.jobState,
      sameState: job.sameState,
      companyAge: job.companyAge,
      jobType: job.jobType,
      seniority: job.seniority,
      skills: job.skills,
      benefits: job.benefits,
      createdAt: job.createdAt,
      companyName: job.companyId?.name || "Unknown Company",
    }));

    res.json({
      total: jobsWithCompanyName.length,
      jobs: jobsWithCompanyName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
