const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

router.post("/applications/apply", applicationController.applyToJob);

module.exports = router;
