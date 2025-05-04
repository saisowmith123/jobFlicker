import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompanyDetailsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    headquarters: "",
    sizeMin: "",
    sizeMax: "",
    ownershipType: "",
    industry: "",
    sector: "",
    revenueMin: "",
    revenueMax: "",
    foundingYear: "",
  });

  const navigate = useNavigate();

  // OPTIONAL: Load existing company data if you're editing
  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    if (companyId) {
      axios
        .get(`https://jobflicker.onrender.com/api/company/${companyId}`)
        .then((res) => {
          const c = res.data;
          setFormData({
            name: c.name || "",
            location: c.location || "",
            headquarters: c.headquarters || "",
            sizeMin: c.size?.min || "",
            sizeMax: c.size?.max || "",
            ownershipType: c.ownershipType || "",
            industry: c.industry || "",
            sector: c.sector || "",
            revenueMin: c.revenue?.min || "",
            revenueMax: c.revenue?.max || "",
            foundingYear: c.foundingYear || "",
          });
        })
        .catch((err) => {
          console.error("Failed to load company details:", err);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      location: formData.location,
      headquarters: formData.headquarters,
      size: {
        min: Number(formData.sizeMin),
        max: Number(formData.sizeMax),
      },
      ownershipType: formData.ownershipType,
      industry: formData.industry,
      sector: formData.sector,
      revenue: {
        min: Number(formData.revenueMin),
        max: Number(formData.revenueMax),
      },
      foundingYear: Number(formData.foundingYear),
    };

    try {
      const response = await axios.post(
        "https://jobflicker.onrender.com/api/company",
        payload
      );

      if (response.data.message === "Company created successfully") {
        console.log("Company created:", response.data.company);

        // Store company ID for later use (like job posting)
        localStorage.setItem("companyId", response.data.company._id);

        alert("Company details saved successfully!");
        navigate("/companies");
      } else {
        alert("Something went wrong while saving company details.");
      }
    } catch (err) {
      console.error("Error submitting company details:", err);
      alert("Failed to save company details. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-8 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-2xl border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          {localStorage.getItem("companyId")
            ? "Edit Company Details"
            : "Add Company Details"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Location + HQ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Headquarters
              </label>
              <input
                type="text"
                name="headquarters"
                value={formData.headquarters}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Size Min
              </label>
              <input
                type="number"
                name="sizeMin"
                value={formData.sizeMin}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Size Max
              </label>
              <input
                type="number"
                name="sizeMax"
                value={formData.sizeMax}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Ownership Type */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Ownership Type
            </label>
            <input
              type="text"
              name="ownershipType"
              value={formData.ownershipType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Industry
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Sector */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Sector
            </label>
            <input
              type="text"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Revenue */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Revenue Min
              </label>
              <input
                type="number"
                name="revenueMin"
                value={formData.revenueMin}
                onChange={handleChange}
                required
                placeholder="e.g., 1000"
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-green-700 text-sm font-medium mb-1">
                Revenue Max
              </label>
              <input
                type="number"
                name="revenueMax"
                value={formData.revenueMax}
                onChange={handleChange}
                required
                placeholder="e.g., 2000"
                className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Founding Year */}
          <div>
            <label className="block text-green-700 text-sm font-medium mb-1">
              Founding Year
            </label>
            <input
              type="number"
              name="foundingYear"
              value={formData.foundingYear}
              onChange={handleChange}
              required
              placeholder="e.g., 1968"
              className="w-full px-3 py-2 border rounded border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Save Company Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyDetailsPage;
