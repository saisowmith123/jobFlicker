const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    job_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Application = mongoose.model(
  "Application",
  applicationSchema,
  "applications"
);

module.exports = Application;
