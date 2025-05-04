const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

router.post("/jobs/filter", jobController.filterJobs);
router.post("/jobs", jobController.createJob);
router.put("/jobs/:id", jobController.updateJob);
router.delete("/jobs/:id", jobController.deleteJob);
router.post("/jobs/byIds", jobController.getJobsByIds);

module.exports = router;
