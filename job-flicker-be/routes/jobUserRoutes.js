const express = require("express");
const router = express.Router();
const jobUserController = require("../controllers/jobUserController");

router.post("/users", jobUserController.createUser);
router.get("/login", jobUserController.loginUser);
router.put("/users/:id", jobUserController.updateUser);
router.post("/logout", jobUserController.logoutUser);

module.exports = router;
