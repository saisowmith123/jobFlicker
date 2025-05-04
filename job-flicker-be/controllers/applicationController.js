const Application = require("../models/application");
const mongoose = require("mongoose");

exports.applyToJob = async (req, res) => {
  try {
    const { user_id, job_id } = req.body;

    if (!user_id || !job_id) {
      return res
        .status(400)
        .json({ message: "user_id and job_id are required" });
    }

    const userIdObj = new mongoose.Types.ObjectId(user_id);
    const jobIdObj = new mongoose.Types.ObjectId(job_id);

    let application = await Application.findOne({ user_id: userIdObj });

    if (!application) {
      application = new Application({
        user_id: userIdObj,
        job_ids: [jobIdObj],
      });
      await application.save();
      return res.status(201).json({
        message: "Application created and job applied successfully",
        application,
      });
    } else {
      if (!application.job_ids.includes(jobIdObj)) {
        application.job_ids.push(jobIdObj);
        await application.save();
      }
      return res.json({
        message: "Job applied successfully",
        application,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
