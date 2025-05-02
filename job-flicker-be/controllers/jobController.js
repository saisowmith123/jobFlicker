const Job = require("../models/job");
const { buildMongoFilters } = require("../utils/jobFilter");

exports.filterJobs = async (req, res) => {
  try {
    const { filters = {}, page = 1, limit = 10 } = req.body;

    const mongoFilters = buildMongoFilters(filters);
    const jobs = await Job.find(mongoFilters)
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
