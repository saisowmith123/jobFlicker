const Company = require("../models/company");
const mongoose = require("mongoose");

exports.createCompany = async (req, res) => {
  try {
    const companyData = req.body;

    if (!companyData.name || !companyData.location) {
      return res
        .status(400)
        .json({ message: "Name and location are required" });
    }

    const newCompany = new Company(companyData);
    await newCompany.save();

    res.status(201).json({
      message: "Company created successfully",
      company: newCompany,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid company ID" });
    }

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCompany = await Company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
