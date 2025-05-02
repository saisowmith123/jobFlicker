const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

router.post("/company", companyController.createCompany);
router.get("/company/:id", companyController.getCompanyById);
router.put("/company/:id", companyController.updateCompany);
router.delete("/company/:id", companyController.deleteCompany);

module.exports = router;
